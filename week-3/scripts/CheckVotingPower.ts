import * as Utils from "./Utils";

async function main() {

    const args = Utils.getArgs();
    const ballotContract = await Utils.getContract(args);
    const tokenContract = await Utils.getTokenContract(Utils.walletPrivateKey, ballotContract);
    const votes = await tokenContract.getVotes(Utils.walletAddress);

    const targetBlockNumber = await ballotContract.targetBlockNumber();
    const currentVotingPower = await ballotContract.votingPower(Utils.walletAddress);
    const votingPowerSpent = await ballotContract.votingPowerSpent(Utils.walletAddress);
    const votingPowerUpToTargetBlockNumber = await tokenContract.getPastVotes(Utils.walletAddress, targetBlockNumber);

    console.log(`\nAccount ${Utils.walletAddress} has:
    - ${votes} units of voting power ever acquired
    - ${votingPowerSpent} units of voting power spent in the ballot
    - ${currentVotingPower} units of voting power still available to spend in the ballot
    - ${votingPowerUpToTargetBlockNumber} units of voting power acquired up to target block number - ${targetBlockNumber}\n\n`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});