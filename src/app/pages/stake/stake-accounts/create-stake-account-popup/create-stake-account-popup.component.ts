import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-create-stake-account-popup',
  templateUrl: './create-stake-account-popup.component.html',
  styleUrls: ['./create-stake-account-popup.component.scss']
})
export class CreateStakeAccountPopupComponent implements OnInit {
  @ViewChild('amountInput') amount: IonInput;
  sendBtnClicked: boolean = false;
  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
  }
  create(){
    const solToDeposit: any  = Number(this.amount.value) * LAMPORTS_PER_SOL
    try {
      this.transactionService.createStakeAccount(solToDeposit)
      this.sendBtnClicked = true;
    } catch (error) {
      console.warn(error)
    }
  }
}
