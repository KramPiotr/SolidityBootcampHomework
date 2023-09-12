import * as dotenv from 'dotenv';
import { ethers } from "ethers";
import { Ballot, Ballot__factory } from "../typechain-types";
dotenv.config();

export let walletAddress = "";

export function setupProvider() {

    const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? "");
    return provider;
}

export async function checkBalance(provider: ethers.JsonRpcProvider, wallet: ethers.Wallet) {

    const balanceBN = await provider.getBalance(wallet.address);
    const balance = Number(ethers.formatUnits(balanceBN));
    console.log(`Wallet balance ${balance}`);
    if (balance < 0.01) {
        throw new Error("Not enough ether");
    }
}

export async function getContract(args: string[]) {

    const ballotAddress = parseNextArgUsingEnv(args);

    const privateKeyName = args[0];
    if (privateKeyName.startsWith("PRIVATE_KEY_")) {
        walletAddress = process.env?.["WALLET_ADDRESS_" + privateKeyName[privateKeyName.length - 1]] ?? "";
    }
    const privateKey = parseNextArgUsingEnv(args);

    const provider = setupProvider();
    const wallet = new ethers.Wallet(privateKey, provider);

    await checkBalance(provider, wallet);

    const ballotFactory = new Ballot__factory(wallet);
    const ballotContract = (await ballotFactory.attach(ballotAddress)
    ) as Ballot;
    return ballotContract;
}

export function parseNextArgUsingEnv(args: string[]) {

    const nextArg = args.shift() ?? "";
    return process.env?.[nextArg] ?? nextArg;
}

export function getArgs() {
    return process.argv.slice(2);
}

export async function printVoterState(ballotContract: Ballot, acc: string) {
    const voter = await ballotContract.voters(acc);
    console.log(`Current state of ${acc}:\n ${voter}\n`);
}