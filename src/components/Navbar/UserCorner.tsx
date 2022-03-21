import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const items = [
  { name: "Your Profile", link: "##" },
  { name: "Settings", link: "##" },
  { name: "Sign out", link: "##" },
];

const UserCorner = () => {
  return (
    <Menu as="div" className="ml-3 relative">
      <div>
        <Menu.Button className="group bg-gray-800 p-2 flex text-sm rounded-full">
          <span className="sr-only">Open user menu</span>
          <p className="text-gray-300 text-base my-auto pr-2 group-hover:text-white">
            0x...9807
          </p>
          <img
            className="h-8 w-8 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </Menu.Button>
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
                <a
                  href={item.link}
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "block px-4 py-2 text-sm text-gray-700"
                  )}
                >
                  {item.name}
                </a>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserCorner;
