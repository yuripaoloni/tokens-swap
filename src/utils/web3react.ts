import { ethers } from "ethers";
import { InjectedConnector } from "@web3-react/injected-connector";

const POLLING_INTERVAL = 12000;

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [4],
}); //? 4 Rinkeby

export const getLibrary = (provider: ethers.providers.ExternalProvider) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;
  return library;
};
