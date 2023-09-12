import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import * as tokenJson from './assets/MyToken.json';

// const BALLOT_CONTRACT_ADDRESS = "0xE876efC50533C21315E1dE5c0548ab9e78633ea6"
const TOKEN_CONTRACT_ADDRESS = '0x64857114161CE268725AFe0adDBdEC65134de328';

@Injectable()
export class AppService {
  tokenContract: ethers.Contract;
  provider: ethers.Provider;
  wallet: ethers.Wallet;

  constructor() {
    this.provider = new ethers.JsonRpcProvider(
      process.env.RPC_ENDPOINT_URL ?? '',
    );
    this.wallet = new ethers.Wallet(
      process.env.PRIVATE_KEY_0 ?? '',
      this.provider,
    );
    this.tokenContract = new ethers.Contract(
      TOKEN_CONTRACT_ADDRESS,
      tokenJson.abi,
      this.wallet,
    );
  }

  getTokenAddress(): any {
    return { address: TOKEN_CONTRACT_ADDRESS };
  }

  getTotalSupply(): Promise<bigint> {
    return this.tokenContract.totalSupply();
  }

  getTokenBalance(address: string): Promise<bigint> {
    return this.tokenContract.balanceOf(address);
  }

  async mintTokens(address: string, amount: number): Promise<any> {
    const newAmount = amount * 1e9;
    console.log(`Minting ${amount} tokens for ${address}`);
    const tx = await this.tokenContract.mint(address, newAmount);
    const receipt = await tx.wait();
    const txHash = receipt.hash;
    return { success: true, txHash }; // TODO: mint tokens
  }
}
