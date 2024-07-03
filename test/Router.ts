import { time, loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";

describe("Router", function () {
  describe("Validations", function () {
    it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
      // Contracts are deployed using the first signer/account by default
      const [owner, otherAccount] = await hre.ethers.getSigners();

      const Lock = await hre.ethers.getContractFactory("Lock");

      // Transactions are sent using the first signer by default
      await time.increaseTo(unlockTime);

      await expect(lock.withdraw()).not.to.be.reverted;
    });
  });
});
