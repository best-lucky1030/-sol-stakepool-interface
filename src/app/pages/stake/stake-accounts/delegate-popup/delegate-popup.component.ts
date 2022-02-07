import { Component, Input, OnInit } from '@angular/core';
import { PublicKey } from '@solana/web3.js';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-delegate-popup',
  templateUrl: './delegate-popup.component.html',
  styleUrls: ['./delegate-popup.component.scss']
})
export class DelegatePopupComponent implements OnInit {
  @Input('stakeAccount') stakeAccount;
  sendBtnClicked: boolean = false;
  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
  }
  delegate(){
    const stakeAccountPubKey = new PublicKey(this.stakeAccount.pubkey)

    try {
      this.transactionService.delegate(stakeAccountPubKey)
      this.sendBtnClicked = true;
    } catch (error) {
      console.warn(error)
    }
  }
}
