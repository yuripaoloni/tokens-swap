import { Web3ReactProvider } from "@web3-react/core";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { getLibrary } from "./utils/web3React";

const Providers: React.FC = ({ children }) => {
  const theme = createTheme({
    palette: {
      background: {
        default: "#1b4487",
        paper: "#e57373",
      },
    },
    typography: {
      allVariants: {
        color: "#fff",
      },
    },
  });

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </Web3ReactProvider>
  );
};

export default Providers;
