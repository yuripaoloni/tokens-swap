import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  QuestionMarkCircleIcon,
  XIcon,
} from "@heroicons/react/outline";

import pancakeSwapTokensList from "../../config/constants/pancakeSwapTokensList.json";

import Token from "../../typings/Token";

type TokensListModalProps = {
  token: Token;
  handleTokenChange: (token: Token, isTokenA: boolean) => void;
  isTokenA: boolean;
  balance: string;
};

const TokensListModal = ({
  token,
  handleTokenChange,
  isTokenA,
  balance,
}: TokensListModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectToken = (token: Token) => {
    handleTokenChange(token, isTokenA);
    setIsOpen(false);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center px-2 py-2 text-sm text-gray-600 border-[1px] shadow-md rounded-md hover:bg-gray-100 "
        >
          {token.logoURI ? (
            <img className="h-5 w-5 rounded-full" src={token.logoURI} alt="" />
          ) : (
            <QuestionMarkCircleIcon className="h-5 inline" />
          )}
          <span className="font-bold mx-2">
            {token.symbol ? token.symbol : "Select token"}
          </span>
          <ChevronDownIcon className="h-5 inline" />
        </button>
        <p className="text-gray-600 text-sm font-medium">Balance: {balance}</p>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setIsOpen(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md overflow-auto text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="flex justify-between text-xl font-bold text-gray-900 py-4 px-4 border-b-[1px]"
                >
                  Select a Token
                  <button>
                    <XIcon
                      className="inline h-6 text-gray-600 hover:text-gray-400"
                      onClick={() => setIsOpen(false)}
                    />
                  </button>
                </Dialog.Title>
                {/* <Dialog.Description className="m-5 p-4 border-[1px] rounded-md shadow-md focus-within:border-indigo-600">
                  <input
                    type="text"
                    name="amount"
                    id="amount"
                    value={search}
                    onChange={(e) => onSearch(e.target.value)}
                    className="block w-full text-gray-500 outline-0"
                    placeholder="Search name or paste address"
                  />
                </Dialog.Description> */}
                <div className="mt-4 overflow-y-auto max-h-96 scrollbar">
                  {pancakeSwapTokensList.tokens.map((token, index) => (
                    <button
                      key={index}
                      className="w-full flex justify-between items-center px-4 py-4 first:pt-2 last:pb-2 hover:bg-gray-100 hover:rounded-md"
                      onClick={() => selectToken(token)}
                    >
                      <div className="flex items-center">
                        <img
                          className="h-7 w-7 rounded-full"
                          src={token.logoURI}
                          alt=""
                        />
                        <div className="ml-3 text-gray-600 font-semibold text-left">
                          {token.symbol}
                          <p className="text-left text-gray-400 text-sm">
                            {token.name}
                          </p>
                        </div>
                      </div>
                      <p>0</p>
                    </button>
                  ))}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default TokensListModal;
