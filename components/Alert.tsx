import { Fragment } from "react";
import { Transition } from "@headlessui/react";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationIcon,
} from "@heroicons/react/solid";
import { useAlert } from "../contexts/AlertContext";

const Alert = () => {
  const { showAlert, alertMessage, alertVariant } = useAlert();

  let alertIcon =
    alertMessage === "success" ? (
      <CheckCircleIcon className="w-4 h-4  fill-current" />
    ) : alertMessage === "danger" ? (
      <ExclamationCircleIcon className="w-4 h-4  fill-current" />
    ) : (
      <ExclamationIcon className="w-4 h-4  fill-current" />
    );

  return (
    <Transition
      as={Fragment}
      show={showAlert}
      enter="transform transition duration-[300ms]"
      enterFrom="opacity-0 scale-50"
      enterTo="opacity-100 rotate-0 scale-100"
      leave="transform duration-200 transition ease-in-out"
      leaveFrom="opacity-100 rotate-0 scale-100 "
      leaveTo="opacity-0 scale-95"
    >
      <div className="fixed z-10 right-0 pt-10 left-0 sm:left-auto px-4 sm:pr-10">
        <div
          className={`rounded-lg py-5 px-3 mb-3 text-base inline-flex items-center w-full ${
            alertVariant === "success"
              ? "bg-green-100 text-green-700"
              : alertVariant === "danger"
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
          role="alert"
        >
          {alertIcon}
          <p className="mx-4">{alertMessage}</p>
        </div>
      </div>
    </Transition>
  );
};

export default Alert;
