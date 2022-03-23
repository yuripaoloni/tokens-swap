import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Navbar from "./components/Navbar/Navbar";
import Swap from "./pages/Swap";
import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { injectedConnector } from "./utils/web3react";

const App = () => {
  // const { activate, account } = useWeb3React();

  // useEffect(() => {
  //   activate(injectedConnector);
  // }, [activate]);

  return (
    <div className="min-h-full">
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/swap" element={<Swap />} />
      </Routes>
    </div>
  );
};

export default App;
