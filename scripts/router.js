const fs = require("fs");
const ethers = require("ethers");
const { JsonRpcProvider } = require("@ethersproject/providers");

require("dotenv").config();

const contractABI = JSON.parse(
  fs.readFileSync("./ignition/deployments/chain-11155111/artifacts/UniswapV2RouterModule#UniswapV2Router01.json")
);

const url = process.env.ALCHEMY_URL;
const network = 11155111;

const provider = new JsonRpcProvider(url, network, {
  staticNetwork: network,
});

const contractAddress = "0xC9a3017839de585956Bd699cFeBDA38dA9d5C335";
const contract = new ethers.Contract(contractAddress, contractABI.abi, provider);

const getWeth = async () => {
  const weth = await contract.WETH();
  console.log(weth);
};

getWeth();
