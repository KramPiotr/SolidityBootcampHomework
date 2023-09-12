import { ethers } from "ethers";
import * as Utils from "./Utils";

async function main() {

    const args = Utils.getArgs();
    const ballotContract = await Utils.getContract(args);
    const winnerNameInBytes = await ballotContract.winnerName();
    const winnerName = ethers.decodeBytes32String(winnerNameInBytes)
    console.log(`The winner is ${winnerName}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});