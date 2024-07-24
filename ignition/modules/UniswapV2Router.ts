import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const UniswapV2RouterModule = buildModule("UniswapV2RouterModule", (m) => {
  const factory = "0x22d06d680aBfE8638a2F2136656325Af518C3FD8";
  const weth = "0xc665C290BaCA0709d66327320206d7c65e2A6F36";
  // const factory_local = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
  // const weth_local = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const router = m.contract("UniswapV2Router01", [factory, weth]);

  return { router };
});

export default UniswapV2RouterModule;
