import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInput, PopoverController } from '@ionic/angular';
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Connection, TransactionInstruction , Transaction, sendAndConfirmTransaction} from '@solana/web3.js';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-send-token-popup',
  templateUrl: './send-token-popup.component.html',
  styleUrls: ['./send-token-popup.component.scss']
})
export class SendTokenPopupComponent implements OnInit {
  @ViewChild('addressInput') address: IonInput;
  @ViewChild('amountInput') amount: IonInput;
  sendBtnClicked: boolean = false;
  constructor(
    private transactionService: TransactionService,
    private walletService: WalletService,
    public popoverController: PopoverController,
    private toastMessageService:ToastMessageService
  ) { }

  async ngOnInit(): Promise<void> {

  }
  async transferSol() {
    let address;
    try {
       address = new PublicKey(this.address.value);
      
    } catch (error) {
      this.toastMessageService.msg.next({ message: 'public key not valid', segmentClass: 'toastError' });
      return
    }

    const amount = Number(this.amount.value) * LAMPORTS_PER_SOL;
    if (address && amount) {
      try {
        this.transactionService.transfer(address,amount);
        this.sendBtnClicked = true;
      } catch (e) {
        console.warn(e);
      }
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.sendBtnClicked = false;
  }
}
