import {
  CheckCircleIcon,
  XCircleIcon,
  ExclamationCircleIcon,
  ExclamationIcon,
} from "@heroicons/react/solid";
import { useAlert } from "../contexts/AlertContext";

const Alert = () => {
  const { showAlert, alertMessage, alertVariant, toggleAlert } = useAlert();

  let alertIcon =
    alertMessage === "success" ? (
      <CheckCircleIcon className="w-4 h-4  fill-current" />
    ) : alertMessage === "danger" ? (
      <ExclamationCircleIcon className="w-4 h-4  fill-current" />
    ) : (
      <ExclamationIcon className="w-4 h-4  fill-current" />
    );

  return showAlert ? (
    <div className="fixed z-10 right-0 pt-10 pr-10">
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
        <button onClick={() => toggleAlert(false, "", "danger")}>
          <XCircleIcon className="w-4 h-4 fill-current" />
        </button>
      </div>
    </div>
  ) : null;
};

export default Alert;
