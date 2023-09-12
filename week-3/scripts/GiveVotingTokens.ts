import { ethers } from 'ethers';
import * as Utils from "./Utils";
import { MyToken } from '../typechain-types';

async function main() {

    const args = Utils.getArgs();
    const ballotContract = await Utils.getContract(args);

    const address = Utils.parseNextArgUsingEnv(args);

    const tokenContract = await Utils.getTokenContract(Utils.walletPrivateKey, ballotContract) as MyToken;

    const amountArg = Utils.parseNextArgUsingEnv(args);
    const mintValue = ethers.parseUnits(amountArg);

    const mintTx = await tokenContract.mint(address, mintValue);
    console.log(await mintTx.wait());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});