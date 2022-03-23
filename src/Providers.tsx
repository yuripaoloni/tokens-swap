import { BrowserRouter } from "react-router-dom";
import { Web3ReactProvider } from "@web3-react/core";
import { getLibrary } from "./utils/web3react";

type ProvidersProps = {
  children: React.ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <BrowserRouter>{children}</BrowserRouter>
    </Web3ReactProvider>
  );
};

export default Providers;
