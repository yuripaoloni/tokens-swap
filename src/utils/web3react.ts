import { providers } from "ethers";
import { InjectedConnector } from "@web3-react/injected-connector";

const POLLING_INTERVAL = 12000;

//? 56 BSC, 97 BSC Testnet
export const injectedConnector = new InjectedConnector({
  supportedChainIds: [4, 56],
});

export const getLibrary = (provider: providers.ExternalProvider) => {
  const library = new providers.Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;
  return library;
};
