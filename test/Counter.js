const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");

describe("Counter", function () {
  // Definimos un fixture para reutilizar la misma configuración en cada prueba.
  async function deployCounterFixture() {
    const initialCounter = 0;

    // Desplegamos el contrato usando el primer signer/account por defecto
    const [owner, otherAccount] = await ethers.getSigners();

    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy(initialCounter);

    return { counter, initialCounter, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the initial counter value", async function () {
      const { counter, initialCounter } = await loadFixture(
        deployCounterFixture
      );

      expect(await counter.getCounter()).to.equal(initialCounter);
    });
  });

  describe("Increment Functionality", function () {
    it("Should increment the counter by 1", async function () {
      const { counter } = await loadFixture(deployCounterFixture);

      await counter.increment();

      expect(await counter.getCounter()).to.equal(1);
    });

    it("Should increment multiple times correctly", async function () {
      const { counter } = await loadFixture(deployCounterFixture);

      await counter.increment();
      await counter.increment();
      await counter.increment();

      expect(await counter.getCounter()).to.equal(3);
    });
  });

  describe("Access Control", function () {
    it("Should allow anyone to increment the counter", async function () {
      const { counter, otherAccount } = await loadFixture(deployCounterFixture);

      await counter.connect(otherAccount).increment();

      expect(await counter.getCounter()).to.equal(1);
    });
  });
});
