import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const AsasantaTrustModule = buildModule(
  "AsasantaTrustModule",
  (m) => {
    const trust = m.contract("AsasantaTrust");

    return { trust };
  }
);

export default AsasantaTrustModule;