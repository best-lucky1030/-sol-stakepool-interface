import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';

import { UtilsService } from 'src/app/services/utils.service';
import { WalletService } from 'src/app/services/wallet.service';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnChanges {
  @Input('currentWallet') wallet;
  copyAddress = faCopy;
  txBook = faBook;
  txHistory = null;
  public searchTerm: string = "";
  constructor(

    public utilsService: UtilsService,
    private walletService: WalletService) {
  }

  ngOnChanges() {
    console.log(this.wallet)
    if (this.wallet) {
      this.getTxHistory(this.wallet)
    } else{
      this.txHistory = null
    }
  }
  
  async getTxHistory(wallet) {

    this.txHistory = await this.walletService.getWalletHistory(wallet)

  }
  openTxRecord(signature: string) {
    window.open(`https://explorer.solana.com/tx/${signature}?cluster=${this.walletService.networkSubject.value.name}`);
  }
}
