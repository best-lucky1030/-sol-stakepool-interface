import { Injectable } from '@angular/core';
import * as bip39 from 'bip39';
import { PriceFeedService } from './price-feed.service';
@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private priceFeedService: PriceFeedService) { }
  public shortenAddress(address, chars = 4): string {

      if (address) {
        return `${address.substring(0, chars + 2)}...${address.substring(42 - chars)}`
      }
      return
    
      // this method been widly used in app, not only inside wallet component, so cant assume object path is constant =
    // if (token) {
    //   if (token.name) {
    //     return token.name;
    //   }
    //   const addr = token.address;
    //   if (addr) {
    //     if (addr.length <= chars) {
    //       return addr;
    //     }
    //     return `${addr.substring(0, chars)}...`;
    //   }
    // }
    // return "-";
  }
  public shortenSignature(signature: string, chars = 4): string {
    if (signature) {
      return `${signature.substring(0, chars + 2)}...${signature.substring(85 - chars)}`
    }
    return
  }
  public solanaUsdPrice(sol): string {
    const priceFeed = this.priceFeedService._solUSDvalue;
    return `${(priceFeed * sol).toFixed(2)}$`;
  }

  public async mnemonicToSeed(mnemonic: string) {
    if (!bip39.validateMnemonic(mnemonic)) {
      throw new Error('Invalid seed words');
    }
    const seed = await bip39.mnemonicToSeed(mnemonic);
    return Buffer.from(seed);
  }

  public async generateMnemonicAndSeed() {
    const mnemonic = bip39.generateMnemonic(128);
    const seed = await bip39.mnemonicToSeed(mnemonic);
    return { mnemonic, seed: Buffer.from(seed).toString('hex') };
  }
}
