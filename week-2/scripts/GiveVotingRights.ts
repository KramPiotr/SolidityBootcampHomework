import * as Utils from "./Utils";

async function main() {

    const args = Utils.getArgs();
    const ballotContract = await Utils.getContract(args);

    const address = Utils.parseNextArgUsingEnv(args);

    const rightToVoteTx = await ballotContract.giveRightToVote(address);
    const rightToVoteReceipt = await rightToVoteTx.wait();
    console.log(`Give right to vote transaction:\n`, rightToVoteReceipt);

    const voter = await ballotContract.voters(address);
    console.log(`\nGave right to vote to ${address}\nUpdated voter struct\n`, voter);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});