const fs = require("fs");
const ethers = require("ethers");
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
const contract = new ethers.Contract(ROUTER_ADDRESS, contractABI.abi, signer);

const getWeth = async () => {
  const weth = await contract.WETH();
  // should be 0xc665C290BaCA0709d66327320206d7c65e2A6F36
  console.log(weth);
};

const approveA = async () => {
  // Mock USDT
  const token = new ethers.Contract(MOCK_USD_ADDRESS, erc20ABI.abi, signer);
  const value = BigNumber("1");
  const spender = ROUTER_ADDRESS;

  console.log(value);
  console.log(spender);

  const tx = await token.approve(spender, 1);
  // console.log(tx);
};

const approveB = async () => {
  // Mock wBTC
  const token = new ethers.Contract(MOCK_WBTC_ADDRESS, erc20ABI.abi, signer);
  const amount = BigNumber("1");
  const spender = ROUTER_ADDRESS;

  const tx = await token.approve(spender, amount);
  console.log(tx);
};

const addLiquidity = async () => {
  const amountADesired = ethers.utils.parseEther("1");
  const amountBDesired = ethers.utils.parseEther("1");
  const amountAMin = ethers.utils.parseEther("0.1");
  const amountBMin = ethers.utils.parseEther("0.1");
  const to = "0x7988123D1F90ccF9675f9D154870Af0f9274DF91"; // owner
  //const to = "0xB758DAF16A01d63E4570E10CbB3897Ab0Cc2a51D"; // index 1
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20;

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
  console.log(tx);
};

// getWeth();
approveA();
