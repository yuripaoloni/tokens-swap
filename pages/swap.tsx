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

import { useAlert } from "../contexts/AlertContext";
import { NextPage } from "next";

const Swap: NextPage = () => {
  const [tokenA, setTokenA] = useState<Token>({} as Token);
  const [tokenB, setTokenB] = useState<Token>({} as Token);

  const [balanceA, setBalanceA] = useState("0.0");
  const [balanceB, setBalanceB] = useState("0.0");

  const [inputA, setInputA] = useState("0.0");
  const [inputB, setInputB] = useState("0.0");

  const [typingTimeout, setTypingTimeout] =
    useState<ReturnType<typeof setTimeout>>();

  const { library, account } = useWeb3React();
  const { toggleAlert } = useAlert();

  const getTokenBalance = async (token: Token): Promise<string> => {
    try {
      const tokenContract = getERC20Contract(token.address, library);
      const balance = await tokenContract.balanceOf(account);
      return formatBigNumber(balance, token.decimals);
    } catch (err) {
      toggleAlert("Invalid input values", "danger");
      return "0.0";
    }
  };

  const checkPairAddress = async (addressA: string, addressB: string) => {
    if (addressA && addressB) {
      const factoryContract = getPancakeSwapFactoryV2Contract(library);

      const pairAddress = await factoryContract.getPair(addressA, addressB);

      if (pairAddress === AddressZero) throw new Error("Invalid pair");
    }
  };

  const onChangeTokenA = async (token: Token) => {
    try {
      await checkPairAddress(token.address, tokenB.address);

      const balance = await getTokenBalance(token);
      setTokenA(token);
      setBalanceA(balance);

      updateTokensAmount(inputA, token, true);
    } catch (error) {
      toggleAlert(
        `Invalid pair ${token.symbol}-${tokenB.symbol} - select different tokens`,
        "danger"
      );
    }
  };

  const onChangeTokenB = async (token: Token) => {
    try {
      await checkPairAddress(tokenA.address, token.address);

      const balance = await getTokenBalance(token);
      setTokenB(token);
      setBalanceB(balance);

      updateTokensAmount(inputB, token, false);
    } catch (error) {
      toggleAlert(
        `Invalid pair ${tokenA.symbol}-${token.symbol} - select different tokens`,
        "danger"
      );
    }
  };

  const onChangeInput = (input: string, isTokenA: boolean) => {
    if (input.match(/^[0-9]*[.,]?[0-9]*$/)) {
      isTokenA ? setInputA(input) : setInputB(input);

      if (typingTimeout) clearTimeout(typingTimeout);

      setTypingTimeout(
        setTimeout(async () => {
          await updateTokensAmount(input, isTokenA ? tokenA : tokenB, isTokenA);
        }, 1500)
      );
    }
  };

  const updateTokensAmount = async (
    input: string,
    token: Token,
    isTokenA: boolean
  ) => {
    try {
      if (tokenA?.address && tokenB?.address && input !== "0.0") {
        const routerContract = getPancakeSwapRouterV2Contract(library);

        let amount = isTokenA
          ? await routerContract.getAmountsOut(
              getBigNumber(input, token.decimals),
              [token.address, tokenB.address]
            )
          : await routerContract.getAmountsIn(
              getBigNumber(input, token.decimals),
              [token.address, tokenB.address]
            );

        isTokenA
          ? setInputB(formatBigNumber(amount[1], tokenB.decimals))
          : setInputA(formatBigNumber(amount[0], tokenA.decimals));
      }
    } catch (error) {
      toggleAlert("Invalid input values", "danger");
    }
  };

  const swap = async () => {
    try {
      const routerContract = getPancakeSwapRouterV2Contract(library);

      const routerSigner = routerContract.connect(library.getSigner());

      await routerSigner.swapExactTokensForTokens(
        getBigNumber(inputA, tokenA.decimals),
        getBigNumber(inputA, tokenA.decimals),
        [tokenA.address, tokenB.address],
        account,
        1648564231
      );

      //TODO listener for event with routerContract.on("xxx")
    } catch (error: any) {
      toggleAlert(error.data.message, "danger");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-750">
      <SwapHeader />
      <main>
        <div className="max-w-md mx-auto sm:px-6 lg:px-8 pt-8 lg:pt-14 2xl:pt-18">
          <div className="shadow-xl rounded-3xl h-[480px] border-t-[1px] border-gray-100 dark:border-slate-800 dark:bg-slate-800">
            <div className="border-b-[1px] border-gray-200 dark:border-gray-900 shadow-md p-3">
              <p className="text-lg font-bold text-center dark:text-gray-200">
                Swap
              </p>
              <p className="text-gray-500 dark:text-gray-300 text-center text-sm">
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
                className="place-content-center py-2 px-6 text-sm font-bold text-white bg-indigo-600 rounded-md bg-opacity-85 hover:bg-opacity-90 disabled:bg-indigo-400"
                disabled={inputA === "0.0" || inputB === "0.0"}
                onClick={() => swap()}
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
