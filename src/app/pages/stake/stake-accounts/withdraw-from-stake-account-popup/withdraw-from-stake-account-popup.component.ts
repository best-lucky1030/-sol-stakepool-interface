import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-withdraw-from-stake-account-popup',
  templateUrl: './withdraw-from-stake-account-popup.component.html',
  styleUrls: ['./withdraw-from-stake-account-popup.component.scss']
})
export class WithdrawFromStakeAccountPopupComponent implements OnInit {
  @ViewChild('amountInput') amount: IonInput;
  @Input('stakeAccount') stakeAccount
  sendBtnClicked: boolean = false;
  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
  }
  withdraw(){
    const amount = Number(this.amount.value) * LAMPORTS_PER_SOL;
    const stakeAccountPubKey = new PublicKey(this.stakeAccount.pubkey)
    console.log(this.stakeAccount);
    try {
      this.transactionService.withdrawDeactivateStakeTokens(stakeAccountPubKey, amount);
      this.sendBtnClicked = true;
    } catch (error) {
      console.warn(error)
    }
  }

}
