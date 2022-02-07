import { PublicKey } from "@solana/web3.js";

export interface Token {
    publicKey: PublicKey;
    address: string;
    name: string;
    amount: number;
    tokenAmount: string;
    isNative: boolean;
}