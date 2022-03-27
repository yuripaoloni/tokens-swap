import { Signer, providers, Contract } from "ethers";

import { addresses } from "../config/addresses";

import pancakeSwapFactoryV2ABI from "../config/abi/pancakeSwapFactoryV2.json";
import pancakeSwapRouterV2ABI from "../config/abi/pancakeSwapRouterV2.json";
import erc20ABI from "../config/abi/erc20.json";

export const getERC20Contract = (
  address: string,
  library: Signer | providers.Web3Provider
) => {
  return new Contract(address, erc20ABI, library);
};

export const getPancakeSwapFactoryV2Contract = (
  library: Signer | providers.Web3Provider
) => {
  return new Contract(
    addresses.pancakeSwapFactoryV2,
    pancakeSwapFactoryV2ABI,
    library
  );
};

export const getPancakeSwapRouterV2Contract = (
  library: Signer | providers.Web3Provider
) => {
  return new Contract(
    addresses.pancakeSwapRouterV2,
    pancakeSwapRouterV2ABI,
    library
  );
};
