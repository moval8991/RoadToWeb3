// scripts/withdraw.js

const hre = require("hardhat");
const abi = require("../artifacts/contracts/BuyMeACoffee.sol/BuyMeACoffee.json");

// Owner address: 0x714be9AeBd7feA1dC43bcc6fcEF2693708d5b138
// Account 2 address: 0x6e67c80b7821afb486d38130FA79fe95aE51F814

async function main() {
  // Get the contract that has been deployed to Goerli.
  const contractAddress="0x7A28Cf30640c5567b2E5f0C8Dc6c2064666C7862";
  const contractABI = abi.abi;

  // Set the address that will receive the funds
  const newWithdrawAddress = "0x6e67c80b7821afb486d38130FA79fe95aE51F814";

  // Get the node connection and wallet connection.
  const provider = new hre.ethers.providers.AlchemyProvider("goerli", process.env.GOERLI_API_KEY);

  // Ensure that signer is the SAME address as the original contract deployer,
  // or else this script will fail with an error.
  const signer = new hre.ethers.Wallet(process.env.PRIVATE_KEY, provider);

  // Instantiate connected contract.
  const buyMeACoffee = new hre.ethers.Contract(contractAddress, contractABI, signer);

  // Set new withdraw address
  console.log("Setting new withdraw address...");
  const setWithdrawAddressTxn = await buyMeACoffee.setWithdrawAddress(newWithdrawAddress);
  await setWithdrawAddressTxn.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
