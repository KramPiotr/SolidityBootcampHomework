import * as Utils from "./Utils";

async function main() {

    const args = Utils.getArgs();
    const ballotContract = await Utils.getContract(args);

    const delegetedVoterAddress = Utils.parseNextArgUsingEnv(args);

    await Utils.printVoterState(ballotContract, Utils.walletAddress);
    await Utils.printVoterState(ballotContract, delegetedVoterAddress);

    const delegateTx = await ballotContract.delegate(delegetedVoterAddress);
    await delegateTx.wait();

    await Utils.printVoterState(ballotContract, Utils.walletAddress);
    await Utils.printVoterState(ballotContract, delegetedVoterAddress);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
