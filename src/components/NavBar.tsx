import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";

type NavBarProps = {
  handleConnect: () => void;
};

const NavBar = ({ handleConnect }: NavBarProps) => {
  const { error, account, chainId, active } = useWeb3React();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Web3 Connect
          </Typography>
          <Typography sx={{ mr: 2 }} variant="h6">
            Active: {active ? "🟢" : "🔴"}
          </Typography>

          <Button variant="contained" color="secondary" onClick={handleConnect}>
            {error
              ? error instanceof UnsupportedChainIdError
                ? "Wrong network"
                : "Error"
              : account
              ? account + "chain id: " + chainId
              : "Connect wallet"}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
