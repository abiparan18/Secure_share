# 🚀 Secure Share — A Decentralized File Sharing DApp

![GitHub Repo Size](https://img.shields.io/github/repo-size/abiparan18/Secure_share?color=blue)
![GitHub Last Commit](https://img.shields.io/github/last-commit/abiparan18/Secure_share)
![License](https://img.shields.io/github/license/abiparan18/Secure_share)
![Made with React](https://img.shields.io/badge/Made%20with-React-blue)

Secure Share is a **decentralized file sharing DApp** built on **Ethereum** and **IPFS**, allowing users to securely upload, store, and retrieve files with full ownership and privacy — no central servers, no compromises.

- **Aathipan** – Project Partner  
  https://github.com/AatHi
---


## 🧰 Tech Stack

- **Frontend**: React.js + Web3.js  
- **Smart Contract**: Solidity (Upload.sol)  
- **Blockchain**: Ethereum (Hardhat local or testnet)  
- **Storage**: IPFS via Pinata API  
- **Wallet Integration**: MetaMask  

---

## ✨ Features

- 🔐 Upload files privately and securely
- 🧾 Store file metadata on Ethereum
- 🌐 Retrieve files via IPFS hash
- 🪪 Connect with MetaMask
- 📜 Full ownership and access control via smart contracts

---

## ⚙️ Installation & Setup

```bash
# 1. Clone the repo
git clone https://github.com/abiparan18/Secure_share.git
cd Secure_share

# 2. Install frontend dependencies
cd client
npm install

# 3. Start React app
npm start

# In a separate terminal
npx hardhat node

# Deploy contract locally
npx hardhat run scripts/deploy.js --network localhost

REACT_APP_PINATA_API_KEY=your_key
REACT_APP_PINATA_SECRET_KEY=your_secret
REACT_APP_CONTRACT_ADDRESS=deployed_contract_address


Made with ❤️ by Abishathan & Aathipan

