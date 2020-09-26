import { Injectable } from "@angular/core";
import { Blockchain } from "SavjeeCoin/src/blockchain";
import EC from "elliptic";

@Injectable({
  providedIn: "root",
})
export class BlockchainService {
  public blockchain = new Blockchain();
  public walletKeys: Array<IWalletKey> = [];

  constructor() {
    this.blockchain.difficulty = 5;
    this.blockchain.minePendingTransactions("hi");
    this.generateWalletKeys();
  }

  minePendingTransactions() {
    this.blockchain.minePendingTransactions(this.walletKeys[0].publicKey);
  }

  addressIsFromCurrentUser(address) {
    return address === this.walletKeys[0].publicKey;
  }

  generateWalletKeys() {
    const ec = new EC.ec("secp256k1");
    const key = ec.genKeyPair();

    this.walletKeys.push({
      keyObj: key,
      publicKey: key.getPublic("hex"),
      privateKey: key.getPrivate("hex"),
    });

    console.log(this.walletKeys);
  }

  getPendingTransactions() {
    return this.blockchain.pendingTransactions;
  }

  addTransaction(tx) {
    this.blockchain.addTransaction(tx);
  }
}

export interface IWalletKey {
  keyObj: any;
  publicKey: string;
  privateKey: string;
}
