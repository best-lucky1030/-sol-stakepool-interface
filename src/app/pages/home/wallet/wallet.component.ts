import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { faCheck, faTimes, faWallet } from '@fortawesome/free-solid-svg-icons';
import { PopoverController } from '@ionic/angular';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { UtilsService } from 'src/app/services/utils.service';
import { WalletService } from 'src/app/services/wallet.service';
import { SendTokenPopupComponent } from './send-token-popup/send-token-popup.component';

import { Token } from '../../../models/token';
import { SellStSOLPopupComponent } from './sell-st-sol-popup/sell-st-sol-popup.component';
@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  @Input('currentWallet') wallet;
  copyAddress = faCopy;
  walletIcon = faWallet;
  vMark = faCheck;
  xMark = faTimes;
  public solBalance = null
  public usdBalance = null;
  public address = null;
  tokensByOwner: any[] = [];
  wSOLwallets = []
  constructor(
    public popoverController: PopoverController,
    public walletService: WalletService,
    public utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    this.wallet = this.walletService.walletController ? this.walletService.walletController.publicKey : null;
    if(this.wallet){
      this.getWalletData(this.wallet)
    }
    this.walletService.currentWallet$.subscribe(async (wallet) => {
      this.wallet = wallet
      this.getWalletData(this.wallet)
    })
   }


  
  async getWalletData(wallet) {

    let tempTokenOwner = [];
    tempTokenOwner.push({
      address: this.wallet.toBase58(),
      name: 'SOL',
      amount: await this.walletService.con.getBalance(wallet) / LAMPORTS_PER_SOL,
      tokenAmount: null,
      isNative: true
    })
    // SPL tokens
    tempTokenOwner = tempTokenOwner.concat((await this.walletService.getTokensOwner()).tokenAccountsFiltered);
    this.tokensByOwner = tempTokenOwner;
    this.wSOLwallets = this.tokensByOwner.filter(wallet => wallet.name == 'wSOL');


  }
  async openSendTokenPopup() {
    const popover = await this.popoverController.create({
      component: SendTokenPopupComponent,
      cssClass: "transfer-token-popup",
      animated: true
    });
    return await popover.present();
  }

  async sell(token){
    const popover = await this.popoverController.create({
      component: SellStSOLPopupComponent,
      cssClass: "transfer-token-popup",
      animated: true,
      componentProps: {token, wSOLwallets: this.wSOLwallets}
    });
    return await popover.present();
  }
}
