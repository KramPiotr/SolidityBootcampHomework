import { ethers } from "ethers";
import { Ballot, Ballot__factory } from "../typechain-types";
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
  const ballotFactory = new Ballot__factory(wallet);
  const ballotContract = (await ballotFactory.deploy(
    proposals.map(ethers.encodeBytes32String)
  )) as Ballot;
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