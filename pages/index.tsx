import { useEffect } from "react";
import Link from "next/link";

import { useWeb3React } from "@web3-react/core";

import { injectedConnector } from "../utils/web3react";

import Footer from "../components/Footer";
import { NextPage } from "next";

const Landing: NextPage = () => {
  const { activate } = useWeb3React();

  useEffect(() => {
    activate(injectedConnector);

    localStorage.getItem("theme") === "dark" &&
      document.documentElement.classList.add("dark");
  }, [activate]);

  return (
    <div className="dark:bg-slate-800">
      <div className="max-w-7xl mx-auto h-screen">
        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
          <div className="sm:text-center lg:text-left">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-gray-200 sm:text-5xl md:text-6xl">
              <span className="block xl:inline">Swap any token</span>{" "}
              <span className="block text-indigo-600 xl:inline">
                with low slippage
              </span>
            </h1>
            <p className="mt-3 text-base text-gray-500 dark:text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
              lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
              fugiat aliqua.
            </p>
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md drop-shadow-md">
                <p className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                  <Link href="swap">Swap</Link>
                </p>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3 drop-shadow-md">
                <p className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-200 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10">
                  <Link href="#">Read documentation</Link>
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Landing;
