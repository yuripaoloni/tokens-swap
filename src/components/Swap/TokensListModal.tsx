import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ChevronDownIcon, XIcon } from "@heroicons/react/outline";

const token = {
  link: "https://pancakeswap.finance/images/tokens/0x8F0528cE5eF7B51152A59745bEfDD91D97091d2F.png",
  name: "ALPACA",
};

const TokensListModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center px-2 py-2 text-sm font-medium text-gray-600 border-[1px] shadow-md rounded-md hover:bg-gray-100 "
      >
        <img className="inline h-6 w-6 rounded-full" src={token.link} alt="" />
        <span className="font-bold mx-2">BNB</span>
        <ChevronDownIcon className="h-5 inline" />
      </button>

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
                  <XIcon
                    className="inline h-6 text-gray-600 hover:text-gray-400"
                    onClick={() => setIsOpen(false)}
                  />
                </Dialog.Title>
                <Dialog.Description className="m-5 p-4 border-[1px] rounded-md shadow-md focus-within:border-indigo-600">
                  {/* <div > */}
                  <input
                    type="text"
                    name="amount"
                    id="amount"
                    className="block w-full text-gray-500 outline-0"
                    placeholder="Search name or paste address"
                  />
                  {/* </div> */}
                </Dialog.Description>
                <div className="mt-4 overflow-y-auto max-h-96 scrollbar">
                  {[...Array(15)].map((i) => (
                    <div className="flex justify-between items-center px-4 py-4 first:pt-2 last:pb-2 hover:bg-gray-100 hover:rounded-md">
                      <div className="flex items-center">
                        <img
                          className="h-7 w-7 rounded-full"
                          src={token.link}
                          alt=""
                        />
                        <p className="ml-3 text-gray-600 font-semibold ">
                          {token.name}
                          <p className="text-gray-400 text-sm">
                            Alpaca Finance
                          </p>
                        </p>
                      </div>
                      <p>0</p>
                    </div>
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
