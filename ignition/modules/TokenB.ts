import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const TokenBModule = buildModule("TokenBModule", (m) => {
  const token = m.contract("MockERC20", ["TokenB"]);

  return { token };
});

export default TokenBModule;
