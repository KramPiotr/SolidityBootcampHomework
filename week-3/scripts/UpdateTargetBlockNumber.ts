// Set target block number script
// The script is needed because of the design choice that I made
// The code could be rewritten not to require this script but then I would need to decouple ballot contract from the token contract.
import * as Utils from "./Utils";

async function main() {

    const args = Utils.getArgs();
    const ballotContract = await Utils.getContract(args);
    const blockNumber = await Utils.provider.getBlockNumber();
    const setTx = await ballotContract.setTargetBlockNumber(blockNumber);
    console.log(await setTx.wait());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});