import { ethers } from "ethers";
import * as Utils from "./Utils";

async function main() {

  const args = Utils.getArgs();
  const ballotContract = await Utils.getContract(args);

  const proposalIdx = Number(args.shift());
  let proposal = await ballotContract.proposals(proposalIdx);
  console.log(`Proposal before voting:\n${proposal}\n`);

  const amount = Utils.parseNextArgUsingEnv(args);
  const votedAmount = ethers.parseUnits(amount);

  const votingTx = await ballotContract.vote(proposalIdx, votedAmount);
  const votingTxReceipt = await votingTx.wait();
  console.log(`Voting transaction:\n`, votingTxReceipt);

  proposal = await ballotContract.proposals(proposalIdx);
  console.log(`Proposal after voting:\n${proposal}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});