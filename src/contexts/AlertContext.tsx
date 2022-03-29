import { createContext, useContext, useState } from "react";

type Variant = "success" | "danger" | "warning";

type AlertContextValue = {
  showAlert: boolean;
  alertMessage: string;
  alertVariant: Variant;
  toggleAlert: (
    showAlert: boolean,
    alertMessage: string,
    alertVariant: Variant
  ) => void;
};
type AlertProviderProps = { children: React.ReactNode };

const AlertContext = createContext<AlertContextValue | undefined>(undefined);

const AlertProvider = ({ children }: AlertProviderProps) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState<Variant>("success");

  const toggleAlert = (
    showAlert: boolean,
    alertMessage: string,
    alertVariant: Variant
  ) => {
    setAlertVariant(alertVariant);
    setAlertMessage(alertMessage);
    setShowAlert(showAlert);
  };

  const value = { showAlert, alertMessage, alertVariant, toggleAlert };

  return (
    <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
  );
};

const useAlert = () => {
  const context = useContext(AlertContext);

  if (context === undefined) {
    throw new Error("useAlert must be used within AlertProvider");
  }

  return context;
};

export { AlertProvider, useAlert };
