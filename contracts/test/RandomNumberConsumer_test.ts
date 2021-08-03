import { deployments, ethers } from "hardhat";
import { Contract } from "ethers";
import { expect } from "chai";

describe("RandomNumberConsumer", function () {
  let randomNumberConsumer: Contract;
  let vrfCoordinatorMock: Contract;
  let linkToken: Contract;

  beforeEach(async function () {
    await deployments.fixture(["mocks", "vrf"]);

    const LinkToken = await deployments.get("LinkToken");
    linkToken = await ethers.getContractAt("LinkToken", LinkToken.address);
    const RandomNumberConsumer = await deployments.get("RandomNumberConsumer");
    randomNumberConsumer = await ethers.getContractAt(
      "RandomNumberConsumer",
      RandomNumberConsumer.address
    );
    const VRFCoordinatorMock = await deployments.get("VRFCoordinatorMock");
    vrfCoordinatorMock = await ethers.getContractAt(
      "VRFCoordinatorMock",
      VRFCoordinatorMock.address
    );
  });

  it("Should successfully make an external random number request", async () => {
    const expected = "777";
    await linkToken.transfer(
      randomNumberConsumer.address,
      "2000000000000000000"
    );
    const transaction = await randomNumberConsumer.getRandomNumber();
    const tx_receipt = await transaction.wait();
    const requestId = tx_receipt.events[2].topics[0];

    // Test the result of the random number request
    await vrfCoordinatorMock.callBackWithRandomness(
      requestId,
      expected,
      randomNumberConsumer.address
    );
    const result = await randomNumberConsumer.randomResult();

    expect(result).equal(expected);
  });
});
