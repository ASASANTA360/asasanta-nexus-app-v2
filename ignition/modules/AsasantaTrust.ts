import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("AsasantaTrustModule", (m) => {
  const trust = m.contract("AsasantaTrust");

  return { trust };
});