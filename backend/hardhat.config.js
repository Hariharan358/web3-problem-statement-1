require('@nomicfoundation/hardhat-ethers');

module.exports = {
  solidity: {
    version: "0.8.27",  // Update to the correct version
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    mumbai: {
      url: "https://polygon-amoy.infura.io/v3/5d6a7cc2d77440a89138b2496ab80da4",  // Replace with your actual RPC URL
      accounts: [
        `379aa2918ced07cc9070ac87ed556cccc19f37e451a4f6f3ca7208544d737136`  // Replace with your private key
      ],
    },
  },
};