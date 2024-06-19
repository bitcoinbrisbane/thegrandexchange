import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const MockUSDTModule = buildModule("MockUSDTModule", (m) => {
  const totalSupply = 1_000_000_000_000;

  const token = m.contract("MockUSDT", [totalSupply]);

  return { token };
});

export default MockUSDTModule;
