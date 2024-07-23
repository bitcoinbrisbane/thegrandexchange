import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const UniswapV2RouterModule = buildModule("UniswapV2RouterModule", (m) => {
  // const factory = "0x22d06d680aBfE8638a2F2136656325Af518C3FD8";
  // const weth = "0xc665C290BaCA0709d66327320206d7c65e2A6F36";
  const factory_local = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  const weth_local = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const router = m.contract("UniswapV2Router01", [factory_local, weth_local]);

  return { router };
});

export default UniswapV2RouterModule;
