import SwapHeader from "../components/Swap/SwapHeader";
import TokenInput from "../components/Swap/TokenInput";
import TokensListModal from "../components/Swap/TokensListModal";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { contracts } from "../config/contracts";
import pancakeSwapFactoryV2ABI from "../config/abi/pancakeSwapFactoryV2.json";
import erc20ABI from "../config/abi/erc20.json";

import { useState } from "react";
import Token from "../typings/Token";

const Swap = () => {
  const [tokenA, setTokenA] = useState<Token>({} as Token);
  const [tokenB, setTokenB] = useState<Token>({} as Token);

  const [inputA, setInputA] = useState<string>("0.0");
  const [inputB, setInputB] = useState<string>("0.0");

  const { library, account } = useWeb3React();

  const testFunction = async () => {
    const pancakeSwapFactoryV2Contract = new ethers.Contract(
      contracts.pancakeSwapFactoryV2,
      pancakeSwapFactoryV2ABI,
      library
    );

    const pairsLenght = await pancakeSwapFactoryV2Contract.allPairsLength();

    console.log(pairsLenght);

    const pairs = await pancakeSwapFactoryV2Contract.allPairs(
      ethers.utils.formatEther(pairsLenght)
    );

    console.log(pairs);
  };

  const handleTokenChange = async (token: Token, isTokenA: boolean) => {
    if (isTokenA) {
      setTokenA(token);

      const tokenContract = new ethers.Contract(
        token.address,
        erc20ABI,
        library
      );

      const balance = await tokenContract.balanceOf(account);

      const formattedBalance = ethers.utils.formatUnits(
        balance,
        token.decimals
      );

      setInputA(formattedBalance);
    } else {
      setTokenB(token);
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
              <div className="my-4 mb-12">
                <TokensListModal
                  token={tokenA}
                  setToken={handleTokenChange}
                  isTokenA
                />
                <TokenInput input={inputA} setInput={setInputA} />
              </div>
              <div className="my-4 mb-10">
                <TokensListModal
                  token={tokenB}
                  setToken={setTokenB}
                  isTokenA={false}
                />
                <TokenInput input={inputB} setInput={setInputB} />
              </div>
              <div className="flex justify-center">
                <button
                  type="button"
                  className="place-content-center py-2 px-6 text-sm font-bold text-white bg-indigo-600 rounded-md bg-opacity-85 hover:bg-opacity-70"
                  onClick={() => testFunction()}
                >
                  SWAP
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Swap;
