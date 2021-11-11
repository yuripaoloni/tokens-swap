import { useWeb3React } from "@web3-react/core";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

const WalletDetails = () => {
  const { account, library } = useWeb3React();

  const [balance, setBalance] = useState("");
  const [blockNumber, setBlockNumber] = useState(null);

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

  return account ? (
    <div>
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
    </div>
  ) : null;
};

export default WalletDetails;
