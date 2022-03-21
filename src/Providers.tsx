import { BrowserRouter } from "react-router-dom";

type ProvidersProps = {
  children: React.ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

export default Providers;
