const fs = require("fs");
const { ethers } = require("ethers");
const BigNumber = require("bignumber.js");
const { JsonRpcProvider } = require("@ethersproject/providers");

require("dotenv").config();

const private_key = process.env.PRIVATE_KEY;
const ROUTER_ADDRESS = "0x819A6D981F0b886384aa257bcFb153Ea9F98cA8e";
const MOCK_USD_ADDRESS = "0x5Df3cF639d8cB528A973B2b4BA6eC9D7EEd6a176";
const TOKEN_0_USD = "0x26a69c93Fbda73A5a46D79bdfCD282B947b741BE";
const TOKEN_1 = "0xd21ba2B3Fd3B921CCf9C60ab2aBEaCCaDb4cE220";
const MOCK_WBTC_ADDRESS = "0x0aD29c477599531eb6d490084C098CE2c430567b";
const WETH = "0xc665C290BaCA0709d66327320206d7c65e2A6F36";
const PAIR = "0x805C24890478BbCd82c8Ce2cF73d9cb00cC7715C";

const routerJson = JSON.parse(
  fs.readFileSync("./ignition/deployments/chain-11155111/artifacts/UniswapV2RouterModule#UniswapV2Router01.json")
);

const routerAbi = routerJson.abi;
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

// The ABI of the ERC-20 contract (simplified)
const abi = ["function approve(address spender, uint256 amount) external returns (bool)"];

// The amount you want to approve (as a BigNumber)
const amount = ethers.BigNumber.from("1000000000000000000"); // 1 token with 18 decimals

async function getFactory() {
  try {
    // Create a contract instance
    const contract = new ethers.Contract(ROUTER_ADDRESS, routerAbi, wallet);
    const factory = await contract.factory();
    console.log("Factory address:", factory);
  } catch (error) {
    console.error("Error approving tokens:", error);
  }
}

async function approveTokenA() {
  try {
    // Create a contract instance
    const contract = new ethers.Contract(MOCK_USD_ADDRESS, abi, wallet);
    const tx = await contract.approve(ROUTER_ADDRESS, amount);
    console.log("Transaction hash:", tx.hash);

    // Wait for the transaction to be mined
    const receipt = await tx.wait();
    console.log("Transaction was mined in block:", receipt.blockNumber);
  } catch (error) {
    console.error("Error approving tokens:", error);
  }
}

async function approveTokenB() {
  try {
    // Create a contract instance
    const contract = new ethers.Contract(MOCK_WBTC_ADDRESS, abi, wallet);
    const tx = await contract.approve(ROUTER_ADDRESS, amount);
    console.log("Transaction hash:", tx.hash);

    // Wait for the transaction to be mined
    const receipt = await tx.wait();
    console.log("Transaction was mined in block:", receipt.blockNumber);
  } catch (error) {
    console.error("Error approving tokens:", error);
  }
}

const addLiquidity = async () => {
  const abi = ["function balanceOf(address owner) view returns (uint256)"];

  // Check owners wallet token balance
  const wbtc = new ethers.Contract(MOCK_WBTC_ADDRESS, abi, wallet);
  const wbtcBalance = await wbtc.balanceOf(wallet.address);
  console.log("WBTC Balance:", wbtcBalance.toString());

  const usdc = new ethers.Contract(MOCK_USD_ADDRESS, abi, wallet);
  const usdcBalance = await usdc.balanceOf(wallet.address);
  console.log("USDC Balance:", usdcBalance.toString());

  const contract = new ethers.Contract(ROUTER_ADDRESS, routerAbi, wallet);
  const amountADesired = ethers.BigNumber.from("1000000000000000"); // 1 USDC
  const amountAMin = ethers.BigNumber.from("100000000000000"); // 0.1 USDC
  const amountBDesired = ethers.BigNumber.from("10000000000000000"); // 0.01 WBTC
  const amountBMin = ethers.BigNumber.from("1000000000000000"); // 0.001 WBTC

  if (usdcBalance.lt(amountADesired)) {
    console.error("Insufficient USDC balance");
    return;
  }

  if (wbtcBalance.lt(amountBDesired)) {
    console.error("Insufficient WBTC balance");
    return;
  }

  const to = "0x7988123D1F90ccF9675f9D154870Af0f9274DF91"; // pair address
  //const to = "0xB758DAF16A01d63E4570E10CbB3897Ab0Cc2a51D"; // index 1
  const deadline = Math.floor(Date.now() / 1000) + 60 * 60; // 60 minutes from the current Unix time

  const tx = await contract.addLiquidity(
    MOCK_USD_ADDRESS,
    MOCK_WBTC_ADDRESS,
    amountADesired,
    amountBDesired,
    amountAMin,
    amountBMin,
    to,
    deadline
  );

  console.log("Transaction hash:", tx.hash);

  // Wait for the transaction to be mined
  const receipt = await tx.wait();
  console.log("Transaction was mined in block:", receipt.blockNumber);
};

// Run the approve function on mock usdt
// TODO: Check the allowance first
// approveTokenA();
// approveTokenB();
getFactory();
// addLiquidity();
