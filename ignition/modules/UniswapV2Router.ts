import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const UniswapV2RouterModule = buildModule("UniswapV2RouterModule", (m) => {
  const fee_setter = "0x7988123D1F90ccF9675f9D154870Af0f9274DF91";
  const factory = m.contract("UniswapV2Factory", [fee_setter]);

  return { factory };
});

export default UniswapV2RouterModule;
