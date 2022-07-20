import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { config as confenv } from "dotenv";
import { HardhatRuntimeEnvironment } from "hardhat/types";

confenv();

const { PRIVATE_KEY, ROPSTEN_URL, URL } = process.env;
const setupAccounts = () => {
  if (!PRIVATE_KEY) {
    console.error("Missing private key in env variable...");
    process.exit();
  }

  return PRIVATE_KEY;
}

const accounts = [setupAccounts()];

if (accounts.length === 0) {
  console.error("Account could not be found. Make sure the MNEMONIC is set in .env");
  process.exit();
}

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      // Add other versions of the compiler here
      { version: "0.8.0" },
      { version: "0.8.7" },
      { version: "0.8.10" },
      { version: "0.8.13" },
      { version: "0.8.15" },
      { version: "0.6.10" },
    ],
  },
  networks: {
    // Add other networks here:
    montrehack: {
      chainId: 77777,
      accounts,
      url: URL || "http://localhost:7777"
    },
    ropsten : {
      url: ROPSTEN_URL,
      accounts,
      chainId: 3
    }
  },
  mocha: {
    // Change default timeout of mocha here:
    timeout: 1000000000
  },
};

// Tasks can be seen as commandline tools you can use to interact with the blockchain.
// Read more here: https://hardhat.org/hardhat-runner/docs/advanced/create-task

// You can run them directly as such: npx hardhat <TASK> [args];
// Example: npx hardhat storage --address <ADDRESS> --slot <SLOT> [--network <NETWORK>]

task("storage", "Get a challenge's storage", async (taskArgs: any, hre: HardhatRuntimeEnvironment) => {
  const storage = await hre.ethers.provider.getStorageAt(taskArgs.address, taskArgs.slot);
  console.log(storage);
}).addParam("address", "Contract's address").addParam("slot", "Storage slot");

task("getCode", "Get a contract's runtime bytecode", async (taskArgs: any, hre: HardhatRuntimeEnvironment) => {
  const code = await hre.ethers.provider.getCode(taskArgs.address);
  console.log(code);
}).addParam("address", "Contract's address");

task("getTransaction", "Get a transaction record", async (taskArgs: any, hre: HardhatRuntimeEnvironment) => {
  const transaction = await hre.ethers.provider.getTransaction(taskArgs.transactionHash);
  console.log(transaction);
}).addParam("transactionHash", "The hash of the transaction");

// Add more tasks here if need be.

export default config;
