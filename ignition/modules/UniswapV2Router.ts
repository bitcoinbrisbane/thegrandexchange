import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const UniswapV2RouterModule = buildModule("UniswapV2RouterModule", (m) => {
  const fee_setter = "0x7988123D1F90ccF9675f9D154870Af0f9274DF91";
  const weth = "0xc665C290BaCA0709d66327320206d7c65e2A6F36";
  const factory = m.contract("UniswapV2Router01", [fee_setter, weth]);

  return { factory };
});

export default UniswapV2RouterModule;
