import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const JavaScriptTokenModule = buildModule("JavaScriptTokenModule", (m) => {
  const token = m.contract("JavaScriptToken");

  return { token };
});

export default JavaScriptTokenModule;
