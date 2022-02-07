import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-undelegate-popup',
  templateUrl: './undelegate-popup.component.html',
  styleUrls: ['./undelegate-popup.component.scss']
})
export class UndelegatePopupComponent implements OnInit {
  @ViewChild('amountInput') amount: IonInput;
  @Input('stakeAccount') stakeAccount
  sendBtnClicked: boolean = false;
  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
  }
  deactivate(){
    const amount = Number(this.amount.value) * LAMPORTS_PER_SOL;
    const stakeAccountPubKey = new PublicKey(this.stakeAccount.pubkey)
    console.log(this.stakeAccount);
    try {
      this.transactionService.deactivateStakeTokens(stakeAccountPubKey, amount);
      this.sendBtnClicked = true;
    } catch (error) {
      console.warn(error)
    }
  }
}
