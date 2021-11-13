import { useWeb3React } from "@web3-react/core";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { contracts } from "config/contracts";
import hardhatTestABI from "config/abi/hardhatTest.json";

const WalletDetails = () => {
  const { account, library } = useWeb3React();

  const [balance, setBalance] = useState("");
  const [blockNumber, setBlockNumber] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const balance = await library.getBalance(account);

        setBalance(ethers.utils.formatEther(balance));
      } catch (error) {
        setBalance("");
      }
    };

    fetchBalance();
  }, [account, library]);

  const getLastBlock = async () => {
    const blockNumber = await library.getBlockNumber();
    setBlockNumber(blockNumber);
  };

  const contractInteraction = async () => {
    const contract = new ethers.Contract(
      contracts.hardhatTest,
      hardhatTestABI,
      library
    );
    const signer = library.getSigner();

    const contractSigner = contract.connect(signer);

    setLoading(true);
    await contractSigner.transfer(account, 20);

    const balance = await contractSigner.owner();
    console.log(ethers.utils.formatEther(balance));

    setLoading(false);
  };

  return account ? (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Button
        sx={{ mt: 4 }}
        variant="contained"
        color="secondary"
        onClick={() => getLastBlock()}
      >
        GET LAST BLOCK
      </Button>
      {blockNumber && (
        <Typography sx={{ mt: 2 }}>
          Latest block number: {blockNumber}
        </Typography>
      )}
      <Typography sx={{ mt: 2 }}>Balance {balance} ETH</Typography>
      <Button
        sx={{ mt: 4 }}
        variant="contained"
        color="secondary"
        onClick={() => contractInteraction()}
      >
        CONNECT CONTRACT
      </Button>
    </div>
  ) : null;
};

export default WalletDetails;
