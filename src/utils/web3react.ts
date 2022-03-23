import { ethers } from "ethers";
import { InjectedConnector } from "@web3-react/injected-connector";

const POLLING_INTERVAL = 12000;

//? 4 Rinkeby, 56 Binace, 97 Binance Testnet
export const injectedConnector = new InjectedConnector({
  supportedChainIds: [4, 56, 97],
});

export const getLibrary = (provider: ethers.providers.ExternalProvider) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;
  return library;
};
