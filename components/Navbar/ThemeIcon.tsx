import { useState, Fragment, useEffect } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/outline";
import { Transition } from "@headlessui/react";

const ThemeIcon = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    setTheme(
      localStorage.getItem("theme") ? localStorage.getItem("theme")! : "light"
    );
  }, []);

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
      className="text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-900 dark:hover:text-white p-2 rounded-full"
      onClick={() => handleThemeChange()}
    >
      <Transition
        as={Fragment}
        show={theme === "dark"}
        enter="transform transition duration-[500ms]"
        enterFrom="opacity-0 rotate-[-120deg] scale-50"
        enterTo="opacity-100 rotate-0 scale-100"
      >
        <SunIcon className="h-6 w-6" aria-hidden="true" />
      </Transition>
      <Transition
        as={Fragment}
        show={theme !== "dark"}
        enter="transform transition duration-[500ms]"
        enterFrom="opacity-0 rotate-[-120deg] scale-50"
        enterTo="opacity-100 rotate-0 scale-100"
      >
        <MoonIcon className="h-6 w-6" aria-hidden="true" />
      </Transition>
    </button>
  );
};

export default ThemeIcon;
