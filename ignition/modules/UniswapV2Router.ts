import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const UniswapV2RouterModule = buildModule("UniswapV2RouterModule", (m) => {
  const fee_setter = "0x7988123D1F90ccF9675f9D154870Af0f9274DF91";
  const weth = "0x8C271dF2DF93110e690feaB3C428B2708F664955";
  const factory = m.contract("UniswapV2Router01", [fee_setter, weth]);

  return { factory };
});

export default UniswapV2RouterModule;
