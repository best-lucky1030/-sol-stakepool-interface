import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Token } from 'src/app/models';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-sell-st-sol-popup',
  templateUrl: './sell-st-sol-popup.component.html',
  styleUrls: ['./sell-st-sol-popup.component.scss']
})
export class SellStSOLPopupComponent implements OnInit {
  @Input('token') token:Token;
  @Input('wSOLwallets') wSOLwallets;
  @ViewChild('amountInput') amount: IonInput;
  public selectedWSOLwallet: Token = null
  sendBtnClicked: boolean = false;
  constructor(private transactionService:TransactionService) { }

  ngOnInit(): void {
    console.log(this.token,this.wSOLwallets)
  }
  setSelectedWSOLwallet(ev){
    this.selectedWSOLwallet = ev.detail.value;
    console.log(this.selectedWSOLwallet)
  }
  sell_stSOL(){
    const amount = Number(this.amount.value) * LAMPORTS_PER_SOL;
    try {
      this.transactionService.sell_stSOL(
        amount,
        this.token.address,
        this.selectedWSOLwallet.address
        )
      this.sendBtnClicked = true;
    } catch (error) {
      console.error(error);
      return
    }
  }
}
