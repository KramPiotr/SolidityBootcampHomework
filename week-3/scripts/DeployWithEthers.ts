import { ethers } from "ethers";
import { MyToken, MyToken__factory, TokenizedBallot, TokenizedBallot__factory } from "../typechain-types";
import * as dotenv from 'dotenv';
dotenv.config();

function setupProvider() {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? "");
  return provider;
}

async function main() {
  const proposals = process.argv.slice(2);
  console.log("Deploying Ballot contract");
  console.log("Proposals: ");
  proposals.forEach((element, index) => {
    console.log(`Proposal N. ${index + 1}: ${element}`);
  });
  const provider = setupProvider();
  const privateKey = process.env.PRIVATE_KEY_0 ?? "";
  const wallet = new ethers.Wallet(privateKey, provider); //ethers.Wallet.fromPhrase() for mnemonic
  const balanceBN = await provider.getBalance(wallet.address);
  const balance = Number(ethers.formatUnits(balanceBN));
  console.log(`Wallet balance ${balance}`);
  if (balance < 0.01) {
    throw new Error("Not enough ether");
  }

  const tokenFactory = new MyToken__factory(wallet);
  const tokenContract = (await tokenFactory.deploy()) as MyToken;
  await tokenContract.waitForDeployment();
  const tokenContractAddress = await tokenContract.getAddress();
  console.log(`Token Contract deployed to the address ${tokenContractAddress}`);

  const blockNumber = await provider.getBlockNumber();

  const ballotFactory = new TokenizedBallot__factory(wallet);
  const ballotContract = (await ballotFactory.deploy(
    proposals.map(ethers.encodeBytes32String),
    tokenContractAddress,
    blockNumber
  )) as TokenizedBallot;
  await ballotContract.waitForDeployment();
  const address = await ballotContract.getAddress();
  console.log(`Contract deployed to the address ${address}`);

  for (let index = 0; index < proposals.length; index++) {
    const proposal = await ballotContract.proposals(index);
    const name = ethers.decodeBytes32String(proposal.name);
    console.log({ index, name, proposal });
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});