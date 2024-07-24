const fs = require("fs");
const ethers = require("ethers");

// load from artifacts

const pairJson = JSON.parse(fs.readFileSync("./artifacts/@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol/IUniswapV2Pair.json"));
const abi = pairJson.abi;

console.log(abi);