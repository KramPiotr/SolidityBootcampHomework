
import { ethers } from 'ethers';
import * as Utils from "./Utils";
import { MyToken } from '../typechain-types';

async function main() {

    const args = Utils.getArgs();
    const ballotContract = await Utils.getContract(args);
    const tokenContract = await Utils.getTokenContract(Utils.walletPrivateKey, ballotContract) as MyToken;

    const address = Utils.parseNextArgUsingEnv(args);

    const amountArg = Utils.parseNextArgUsingEnv(args);
    const transferValue = ethers.parseUnits(amountArg);

    const transferTx = await tokenContract.transfer(address, transferValue);
    console.log(await transferTx.wait());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});