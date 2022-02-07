import { Component, OnInit } from '@angular/core';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-stake',
  templateUrl: './stake.component.html',
  styleUrls: ['./stake.component.scss']
})
export class StakeComponent   {
  public currentWallet = null;
  constructor(private walletService: WalletService) {
   }

   ionViewWillEnter(){
    this.currentWallet = this.walletService.walletController ? this.walletService.walletController.publicKey : null;
    this.walletService.currentWallet$.subscribe(async (wallet) => {
      this.currentWallet = wallet
    })
   }

}

