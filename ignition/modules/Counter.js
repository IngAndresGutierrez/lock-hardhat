// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("CounterModule", (m) => {
  // Default initial value for the counter
  const initialCounterValue = m.getParameter("initialCounterValue", 0);

  // Deploy the Counter contract
  const counter = m.contract("Counter", [initialCounterValue]);

  return { counter };
});

