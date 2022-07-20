import { expect } from "chai";
import { BigNumber, Contract, ContractFactory, providers, Signer } from "ethers";
import { ethers } from "hardhat";

describe("<NAME>", function () {
    // A signer is an abstraction of an Ethereum account. Use this to sign transactions, interact
    // with the provider, etc.
    let signer: Signer;
    let player: string;
    let challengeFactory: ContractFactory;
    
    // Contract interface of the challenge, use this to interact with the challenge.
    let challenge: Contract;  

    // Set the address you received from the deployer
    let challengeInstanceAddress = "<CHALLENGE_INSTANCE_ADDRESS"; 

    before(async () => {
        [signer] = await ethers.getSigners();
        player = await signer.getAddress();
        console.log("Primary Signer Address:", player);

        // comment the next two lines if running locally 
        challengeFactory = await ethers.getContractFactory("<CHALLENGE CONTRACT NAME>");
        challenge = challengeFactory.attach(challengeInstanceAddress);

        // uncomment if running locally:
        // challengeFactory = await ethers.getContractFactory("<CHALLENGE CONTRACT NAME>");
        // challenge = await challengeFactory.deploy(/**put your constructor args here*/);
        // await challenge.deployed();
    });

    it("Should solve the challenge", async () => {
      // Write your code here:

    });
});