const fs = require("fs");
const { ethers } = require("ethers");
const BigNumber = require("bignumber.js");
const { JsonRpcProvider } = require("@ethersproject/providers");

require("dotenv").config();

const private_key = process.env.PRIVATE_KEY;
const ROUTER_ADDRESS = "0xC9a3017839de585956Bd699cFeBDA38dA9d5C335";
const MOCK_USD_ADDRESS = "0x5Df3cF639d8cB528A973B2b4BA6eC9D7EEd6a176";
const MOCK_WBTC_ADDRESS = "0x0aD29c477599531eb6d490084C098CE2c430567b";
const WETH = "0xc665C290BaCA0709d66327320206d7c65e2A6F36";

const contractABI = JSON.parse(
  fs.readFileSync("./ignition/deployments/chain-11155111/artifacts/UniswapV2RouterModule#UniswapV2Router01.json")
);

const erc20ABI = JSON.parse(
  fs.readFileSync("./ignition/deployments/chain-11155111/artifacts/MockUSDTModule#MockUSDT.json")
);

const url = process.env.HTTPS_PROVIDER;
const network = 11155111;

const provider = new JsonRpcProvider(url, network, {
  staticNetwork: network,
});

const signer = new ethers.Wallet(private_key, provider);

// Your wallet private key
const privateKey = process.env.PRIVATE_KEY;

// Create a wallet instance
const wallet = new ethers.Wallet(privateKey, provider);

// The Router address
const contractAddress = "0x5Df3cF639d8cB528A973B2b4BA6eC9D7EEd6a176";

// The ABI of the ERC-20 contract (simplified)
const abi = ["function approve(address spender, uint256 amount) external returns (bool)"];

// Create a contract instance
const contract = new ethers.Contract(contractAddress, abi, wallet);

// The address you want to approve
const spenderAddress = "0xC9a3017839de585956Bd699cFeBDA38dA9d5C335";

// The amount you want to approve (as a BigNumber)
const amount = ethers.BigNumber.from("1000000000000000000"); // 1 token with 18 decimals

// Call the approve function
async function approve() {
  try {
    const tx = await contract.approve(spenderAddress, amount);
    console.log("Transaction hash:", tx.hash);

    // Wait for the transaction to be mined
    const receipt = await tx.wait();
    console.log("Transaction was mined in block:", receipt.blockNumber);
  } catch (error) {
    console.error("Error approving tokens:", error);
  }
}

// Run the approve function
approve();
