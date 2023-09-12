import * as dotenv from 'dotenv';
import { ethers } from "ethers";
import { MyToken, MyToken__factory, TokenizedBallot, TokenizedBallot__factory } from "../typechain-types";
dotenv.config();

export let walletAddress = "";
export let walletPrivateKey = "";
export let provider : ethers.JsonRpcProvider;

export async function setupProvider() {

    provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? "");
    const blockNumber = await provider.getBlockNumber();
    console.log(`Current block number: ${blockNumber}`);
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

    const { address, privateKey } = getWalletAndAddress(args);
    walletAddress = address;
    walletPrivateKey = privateKey;

    await setupProvider();
    const wallet = new ethers.Wallet(privateKey, provider);

    await checkBalance(provider, wallet);

    const ballotFactory = new TokenizedBallot__factory(wallet);
    const ballotContract = (await ballotFactory.attach(ballotAddress)
    ) as TokenizedBallot;
    return ballotContract;
}

export async function getTokenContract(privateKey: string, ballotContract: TokenizedBallot) {

    const wallet = new ethers.Wallet(privateKey, provider);

    const tokenContractAddress = await ballotContract.tokenContract();

    const tokenFactory = new MyToken__factory(wallet);
    const tokenContract = (await tokenFactory.attach(tokenContractAddress)) as MyToken;

    return tokenContract;
}

export function getWalletAndAddress(args: string[]) {

    const nextArg = args.shift();
    let address;
    let privateKey;
    if (nextArg?.startsWith("WALLET_ADDRESS") || nextArg?.startsWith("PRIVATE_KEY")) {

        const walletAddressName = "WALLET_ADDRESS_" + nextArg[nextArg.length - 1];
        address = process.env?.[walletAddressName];

        const privateKeyName = "PRIVATE_KEY_" + nextArg[nextArg.length - 1];
        privateKey = process.env?.[privateKeyName];
    } else {
        address = args.shift();
        privateKey = args.shift();
    }

    address ??= "";
    privateKey ??= "";

    return {
        address,
        privateKey
    }
}

export function parseNextArgUsingEnv(args: string[]) {

    const nextArg = args.shift() ?? "";
    return process.env?.[nextArg] ?? nextArg;
}

export function getArgs() {
    return process.argv.slice(2);
}