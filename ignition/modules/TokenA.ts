import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const TokenAModule = buildModule("TokenAModule", (m) => {
  const token = m.contract("MockERC20", ["TokenA"]);

  return { token };
});

export default TokenAModule;
