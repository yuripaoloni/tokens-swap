import { useState, Fragment } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/outline";
import { Transition } from "@headlessui/react";

const ThemeIcon = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme"));

  const handleThemeChange = () => {
    if (localStorage.getItem("theme") === "dark") {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <button
      type="button"
      className="bg-gray-800 p-1 pr-2 rounded-full text-gray-400 hover:text-white "
    >
      <span className="sr-only">View notifications</span>
      <Transition
        as={Fragment}
        show={theme === "dark"}
        enter="transform transition duration-[500ms]"
        enterFrom="opacity-0 rotate-[-120deg] scale-50"
        enterTo="opacity-100 rotate-0 scale-100"
      >
        <SunIcon
          className="h-6 w-6"
          aria-hidden="true"
          onClick={() => handleThemeChange()}
        />
      </Transition>
      <Transition
        as={Fragment}
        show={theme === "light"}
        enter="transform transition duration-[500ms]"
        enterFrom="opacity-0 rotate-[-120deg] scale-50"
        enterTo="opacity-100 rotate-0 scale-100"
      >
        <MoonIcon
          className="h-6 w-6"
          aria-hidden="true"
          onClick={() => handleThemeChange()}
        />
      </Transition>
    </button>
  );
};

export default ThemeIcon;
