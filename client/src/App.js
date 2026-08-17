import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";
import { motion } from "framer-motion";
import "./App.css";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const loadProvider = async () => {
      if (!window.ethereum) {
        alert("Install MetaMask to use Secure Share");
        return;
      }

      const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
      if (!contractAddress) {
        alert("Contract address is not configured. See README.md.");
        return;
      }

      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);

      const updateAccount = async () => {
        const signer = web3Provider.getSigner();
        setAccount(await signer.getAddress());
      };

      window.ethereum.on("accountsChanged", updateAccount);
      window.ethereum.on("chainChanged", () => window.location.reload());

      await web3Provider.send("eth_requestAccounts", []);
      const signer = web3Provider.getSigner();
      setAccount(await signer.getAddress());
      setContract(new ethers.Contract(contractAddress, Upload.abi, signer));
      setProvider(web3Provider);
    };

    loadProvider().catch((error) => {
      console.error("Unable to initialize Web3 provider", error);
      alert("Unable to connect to MetaMask");
    });
  }, []);

  return (
    <div className="App">
      {!modalOpen && (
        <motion.button
          className="share"
          whileHover={{ scale: 1.1 }}
          onClick={() => setModalOpen(true)}
        >
          Share
        </motion.button>
      )}
      {modalOpen && <Modal setModalOpen={setModalOpen} contract={contract} />}

      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Secure Share
      </motion.h1>

      <motion.div
        className="account-display"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Account: {account || "Not connected"}
      </motion.div>

      <FileUpload account={account} provider={provider} contract={contract} />
      <Display contract={contract} account={account} />
    </div>
  );
}

export default App;
