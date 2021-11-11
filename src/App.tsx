import { useWeb3React } from "@web3-react/core";
import { Box } from "@mui/material";
import WalletDetails from "components/WalletDetails";
import NavBar from "components/NavBar";
import { injectedConnector } from "utils/web3React";

const App = () => {
  const { activate } = useWeb3React();

  //error handling: https://github.com/NoahZinsmeister/web3-react/tree/v6/docs#understanding-error-bubbling
  const handleConnect = () => {
    activate(injectedConnector);
  };

  return (
    <Box sx={{ padding: 1 }}>
      <NavBar handleConnect={handleConnect} />
      <WalletDetails />
    </Box>
  );
};

export default App;
