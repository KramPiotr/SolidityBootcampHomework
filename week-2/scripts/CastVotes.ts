import * as Utils from "./Utils";

async function main() {

  const args = Utils.getArgs();
  const ballotContract = await Utils.getContract(args);

  await Utils.printVoterState(ballotContract, Utils.walletAddress);

  const proposalIdx = Number(args.shift());
  let proposal = await ballotContract.proposals(proposalIdx);
  console.log(`Proposal before voting:\n${proposal}\n`);

  const votingTx = await ballotContract.vote(proposalIdx);
  const votingTxReceipt = await votingTx.wait();
  console.log(`Voting transaction:\n`, votingTxReceipt);

  await Utils.printVoterState(ballotContract, Utils.walletAddress);

  proposal = await ballotContract.proposals(proposalIdx);
  console.log(`Proposal after voting:\n${proposal}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});