import { useState, useEffect } from "react";
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
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("accountsChanged", async () => {
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          setAccount(address);
        });

        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);

        const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; 
        const contract = new ethers.Contract(contractAddress, Upload.abi, signer);
        setContract(contract);
        setProvider(provider);
      } else {
        alert("Install MetaMask");
      }
    };

    loadProvider();
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
        Account: {account ? account : "Not connected"}
      </motion.div>

      <FileUpload account={account} provider={provider} contract={contract} />
      <Display contract={contract} account={account} />
    </div>
  );
}

export default App;
