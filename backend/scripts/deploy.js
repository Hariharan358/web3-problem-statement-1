const hre = require("hardhat");

async function main() {
  console.log("Starting the deployment...");

  // Get the ContractFactory for DocumentStorage
  const DocumentStorage = await hre.ethers.getContractFactory("DocumentStorage");

  console.log("Deploying DocumentStorage contract...");

  // Deploy the contract
  const documentStorage = await DocumentStorage.deploy();
  
  // Log the returned object from the deployment
  console.log("Returned documentStorage object:", documentStorage);

  // Check if it's a contract instance with deployed() method
  console.log("Does deploy() object have deployed method?", documentStorage.deployed ? true : false);

  // Log the transaction hash
  console.log("Deployment transaction hash:", documentStorage.deployTransaction.hash);

  // If it's a valid contract instance, wait for deployment to complete
  if (documentStorage.deployed) {
    await documentStorage.deployed();
    console.log("DocumentStorage deployed to:", documentStorage.address);
  } else {
    console.error("Deployment didn't return a contract instance with 'deployed' method.");
  }
  
  // Optionally log the network name
  console.log("Deployed on network:", hre.network.name);
}

// Execute the main function
main()
  .then(() => process.exit(0))  // Success exit code
  .catch((error) => {
    console.error("Error during deployment:", error);
    process.exitCode = 1;  // Failure exit code
  });
