import { Fragment, useMemo } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { injectedConnector } from "../../utils/web3react";
import { UserCircleIcon } from "@heroicons/react/outline";

const UserCorner = () => {
  const { active, activate, account, error, deactivate } = useWeb3React();

  const items = useMemo(
    () => [
      { name: "Settings", onClick: () => {} },
      { name: "Disconnect", onClick: () => deactivate() },
    ],
    [deactivate]
  );

  return (
    <Menu as="div" className="ml-3 relative">
      <div>
        {active ? (
          <Menu.Button className="group bg-gray-800 p-2 flex text-sm rounded-full">
            <p className="text-gray-300 text-base my-auto pr-2 group-hover:text-white">
              0x...{account?.slice(account.length - 4)}
            </p>
            <UserCircleIcon className="h-8 w-8 text-gray-300 group-hover:text-white" />
          </Menu.Button>
        ) : (
          <button
            className="rounded-md shadow py-2 px-4 font-medium text-base text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-red-600"
            onClick={() => activate(injectedConnector)}
            disabled={error instanceof UnsupportedChainIdError}
          >
            {error instanceof UnsupportedChainIdError
              ? "Wrong network"
              : "Connect"}
          </button>
        )}
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          {items.map((item) => (
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={item.onClick}
                  className={`${active ? "bg-gray-100" : ""}
                     w-full text-left block px-4 py-2 text-sm text-gray-700`}
                >
                  {item.name}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserCorner;
