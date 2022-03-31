import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";

import { injectedConnector } from "./utils/web3react";

import Landing from "./pages/Landing";
import Swap from "./pages/Swap";

import Navbar from "./components/Navbar/Navbar";

import Alert from "./components/Alert";

const App = () => {
  const { activate } = useWeb3React();

  useEffect(() => {
    activate(injectedConnector);

    localStorage.getItem("theme") === "dark" &&
      document.documentElement.classList.add("dark");
  }, [activate]);

  return (
    <div className="min-h-full dark:bg-slate-750">
      <Alert />
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/swap" element={<Swap />} />
      </Routes>
    </div>
  );
};

export default App;
