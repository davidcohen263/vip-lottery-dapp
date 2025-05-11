const hre = require("hardhat");

async function main() {
  const Lottery = await hre.ethers.getContractFactory("LotteryContract");
  const contract = await Lottery.deploy();
  await contract.waitForDeployment();
  console.log("✅ Contract deployed at:", contract.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});