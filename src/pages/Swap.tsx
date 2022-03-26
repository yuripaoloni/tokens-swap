import { useState } from "react";
import { useWeb3React } from "@web3-react/core";

import SwapHeader from "../components/Swap/SwapHeader";
import TokenInput from "../components/Swap/TokenInput";

import {
  getERC20Contract,
  getPancakeSwapFactoryV2Contract,
  getPancakeSwapPairContract,
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

  const { library, account } = useWeb3React();

  const handleTokenChange = async (token: Token, isTokenA: boolean) => {
    const tokenContract = getERC20Contract(token.address, library);
    const balance = await tokenContract.balanceOf(account);

    if (isTokenA) {
      setTokenA(token);
      setBalanceA(formatBigNumber(balance, token.decimals));
    } else {
      setTokenB(token);
      setBalanceB(formatBigNumber(balance, token.decimals));
    }
  };

  const handleAmountChange = async (input: string, isTokenA: boolean) => {
    let token = isTokenA ? tokenA : tokenB;

    //TODO handle set input until the value of balance
    isTokenA ? setInputA(input) : setInputB(input);

    const factoryContract = getPancakeSwapFactoryV2Contract(library);

    const pairAddress = await factoryContract.getPair(
      tokenA.address,
      tokenB.address
    );

    //TODO handle invalid pair
    if (pairAddress !== AddressZero) {
      const pairContract = getPancakeSwapPairContract(pairAddress, library);

      const reserves = await pairContract.getReserves();

      const routerContract = getPancakeSwapRouterV2Contract(library);

      const amountOut = await routerContract.getAmountIn(
        getBigNumber(inputA, token.decimals),
        isTokenA ? reserves._reserve0 : reserves._reserve1,
        isTokenA ? reserves._reserve1 : reserves._reserve0
      );

      isTokenA
        ? setInputA(formatBigNumber(amountOut, token.decimals))
        : setInputB(formatBigNumber(amountOut, token.decimals));
    }
  };

  return (
    <div>
      <SwapHeader />
      <main>
        <div className="max-w-md mx-auto pt-10 sm:px-6 lg:px-8">
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
                handleTokenChange={handleTokenChange}
                input={inputA}
                isTokenA
                token={tokenA}
                handleAmountChange={handleAmountChange}
              />
              <TokenInput
                balance={balanceB}
                handleTokenChange={handleTokenChange}
                input={inputB}
                isTokenA={false}
                token={tokenB}
                handleAmountChange={handleAmountChange}
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
