import * as Utils from "./Utils";

async function main() {

    const args = Utils.getArgs();
    const ballotContract = await Utils.getContract(args);

    let delegetedVoterAddress = Utils.parseNextArgUsingEnv(args);
    if (delegetedVoterAddress === "") {
        delegetedVoterAddress = Utils.walletAddress;
    }

    const tokenContract = await Utils.getTokenContract(Utils.walletPrivateKey, ballotContract);

    const delegateTx = await tokenContract.delegate(delegetedVoterAddress);
    console.log(await delegateTx.wait());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
