import { useState } from "react";
import { useWeb3React } from "@web3-react/core";

import SwapHeader from "../components/Swap/SwapHeader";
import TokenInput from "../components/Swap/TokenInput";

import {
  getERC20Contract,
  getPancakeSwapFactoryV2Contract,
  getPancakeSwapRouterV2Contract,
} from "../utils/contractHelpers";
import {
  AddressZero,
  formatBigNumber,
  getBigNumber,
} from "../utils/ethersUtils";

import Token from "../typings/Token";

const Swap = () => {
  const [tokenA, setTokenA] = useState<Token>({} as Token);
  const [tokenB, setTokenB] = useState<Token>({} as Token);

  const [balanceA, setBalanceA] = useState("0.0");
  const [balanceB, setBalanceB] = useState("0.0");

  const [inputA, setInputA] = useState("0.0");
  const [inputB, setInputB] = useState("0.0");

  const [typingTimeout, setTypingTimeout] =
    useState<ReturnType<typeof setTimeout>>();

  const [error, setError] = useState(false);

  const { library, account } = useWeb3React();

  const getTokenBalance = async (token: Token): Promise<string> => {
    const tokenContract = getERC20Contract(token.address, library);
    const balance = await tokenContract.balanceOf(account);
    return formatBigNumber(balance, token.decimals);
  };

  const checkPairAddress = async (
    addressA: string,
    addressB: string
  ): Promise<boolean> => {
    if (addressA && addressB) {
      const factoryContract = getPancakeSwapFactoryV2Contract(library);

      const pairAddress = await factoryContract.getPair(addressA, addressB);

      return pairAddress !== AddressZero;
    }

    return true;
  };

  const onChangeTokenA = async (token: Token) => {
    const pairExists = await checkPairAddress(token.address, tokenB.address);

    if (!pairExists) {
      setError(true);
    } else {
      const balance = await getTokenBalance(token);
      setTokenA(token);
      setBalanceA(balance);

      if (tokenB?.address) {
        updateTokensAmount(inputA, true);
      }
    }
  };

  const onChangeTokenB = async (token: Token) => {
    const pairExists = await checkPairAddress(tokenA.address, token.address);

    if (pairExists) {
      setError(true);
    } else {
      const balance = await getTokenBalance(token);
      setTokenB(token);
      setBalanceB(balance);

      if (tokenA?.address) {
        console.log("in");
        updateTokensAmount(inputB, false);
      }
    }
  };

  const onChangeInput = async (input: string, isTokenA: boolean) => {
    isTokenA ? setInputA(input) : setInputB(input);

    if (typingTimeout) clearTimeout(typingTimeout);

    setTypingTimeout(
      setTimeout(async () => {
        updateTokensAmount(input, isTokenA);
      }, 1500)
    );
  };

  const updateTokensAmount = async (input: string, isTokenA: boolean) => {
    const routerContract = getPancakeSwapRouterV2Contract(library);

    let amount = isTokenA
      ? await routerContract.getAmountsOut(
          getBigNumber(input, tokenA.decimals),
          [tokenA.address, tokenB.address]
        )
      : await routerContract.getAmountsIn(
          getBigNumber(input, tokenB.decimals),
          [tokenA.address, tokenB.address]
        );

    isTokenA
      ? setInputB(formatBigNumber(amount[1], tokenB.decimals))
      : setInputA(formatBigNumber(amount[0], tokenA.decimals));
  };

  const swap = () => {
    //TODO check here for valid balances
  };

  return (
    <div>
      <SwapHeader />
      <main>
        <div className="max-w-md mx-auto sm:px-6 lg:px-8 pt-8 lg:pt-14 2xl:pt-18">
          <div className="shadow-xl rounded-3xl h-[480px] border-2">
            <div className="border-b-[1px] border-gray-200 p-3">
              <p className="text-lg font-bold text-center">Swap</p>
              <p className="text-gray-500 text-center text-sm">
                Swap instantly any BEP-20 token
              </p>
            </div>
            <div className="p-4">
              <TokenInput
                balance={balanceA}
                onChangeToken={onChangeTokenA}
                input={inputA}
                isTokenA
                token={tokenA}
                onChangeInput={onChangeInput}
              />
              <TokenInput
                balance={balanceB}
                onChangeToken={onChangeTokenB}
                input={inputB}
                isTokenA={false}
                token={tokenB}
                onChangeInput={onChangeInput}
              />
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                className="place-content-center py-2 px-6 text-sm font-bold text-white bg-indigo-600 rounded-md bg-opacity-85 hover:bg-opacity-70 disabled:bg-indigo-400"
                disabled={inputA === "0.0" || inputB === "0.0"}
                onClick={() => {}}
              >
                {inputA === "0.0" || inputB === "0.0"
                  ? "Enter an amount"
                  : "SWAP"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Swap;
