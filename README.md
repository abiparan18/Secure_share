# Secure Share

A decentralized file-sharing prototype built with React, Solidity, Ethereum, and IPFS. Secure Share records IPFS links on-chain and lets an owner grant or revoke wallet-based access to their file list.

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Solidity](https://img.shields.io/badge/Solidity-%5E0.7%20%7C%7C%20%5E0.8-363636?logo=solidity)](https://soliditylang.org/)
[![Hardhat](https://img.shields.io/badge/Hardhat-2.23-F7DF1E)](https://hardhat.org/)
![GitHub last commit](https://img.shields.io/github/last-commit/abiparan18/Secure_share)

## Highlights

- Uploads files through a server-side IPFS/Pinata integration
- Stores IPFS URLs in an Ethereum smart contract
- Uses MetaMask for wallet connection and transaction signing
- Grants and revokes access between wallet addresses
- Retrieves file lists according to the contract's access rules
- Includes a React interface with Material UI and Framer Motion

## Architecture

```text
React + MetaMask
      |
      +--> Upload API (server-side Pinata credential) --> IPFS
      |
      +--> Upload.sol on Ethereum --> file URL + access state
```

Pinata credentials must stay on a trusted server. The React application only calls the public upload endpoint configured by `REACT_APP_UPLOAD_ENDPOINT`.

## Technology

| Layer | Technology |
| --- | --- |
| Frontend | React 18, Material UI, Framer Motion |
| Web3 | ethers.js, MetaMask |
| Smart contract | Solidity, Hardhat |
| Storage | IPFS through a server-side Pinata integration |
| Network | Local Hardhat network or a compatible Ethereum test network |

## Local development

### Prerequisites

- Node.js and npm
- MetaMask
- A server-side upload endpoint that accepts a multipart `file` field and returns `{ "IpfsHash": "..." }`
- A Pinata account configured only on that server

### 1. Install and start the local blockchain

```bash
git clone https://github.com/abiparan18/Secure_share.git
cd Secure_share
npm install
npx hardhat node
```

Keep that terminal running.

### 2. Deploy the contract

In a second terminal:

```bash
cd Secure_share
npx hardhat run scripts/deploy.js --network localhost
```

Copy the deployed contract address printed by the script.

### 3. Configure the frontend

```bash
cd client
cp .env.example .env.local
```

Set these values in `.env.local`:

```dotenv
REACT_APP_CONTRACT_ADDRESS=0xYourDeployedContractAddress
REACT_APP_UPLOAD_ENDPOINT=http://localhost:3001/api/upload
```

Never put a Pinata API secret or JWT in a React environment variable: React embeds those values in the browser bundle.

### 4. Run the frontend

```bash
cd client
npm install
npm start
```

Connect MetaMask to the local Hardhat network, select a funded development account, and open the URL shown by React.

## Security notes

- IPFS content is not private by default. Anyone who has a reachable content identifier may be able to retrieve the file.
- The contract controls discovery of stored URLs; it does not encrypt file contents.
- Use client-side encryption before upload if confidentiality is required.
- This prototype has not undergone a professional smart-contract security audit.
- Use local networks or testnets only until the contract and upload service have been reviewed.
- Never commit credentials, private keys, seed phrases, real malware, or sensitive files.

If a credential was previously committed, remove it from the current source and revoke it immediately. Git history may still retain the old value.

## Project structure

```text
.
├── client/                 React frontend
├── contracts/Upload.sol    File URL and access-control contract
├── scripts/deploy.js       Hardhat deployment script
├── test/                   Contract tests
└── hardhat.config.js       Hardhat configuration
```

## Contributors

- [Abishathan Thayaparan](https://github.com/abiparan18)
- [Aathipan](https://github.com/AatHi)

## Status

Educational prototype. Contributions and security-focused review are welcome.
