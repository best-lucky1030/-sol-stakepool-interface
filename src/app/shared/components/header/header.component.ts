import { Component, OnInit, ViewChild } from '@angular/core';
import { faExternalLinkAlt, faRocket } from '@fortawesome/free-solid-svg-icons';
import { IonSelect, PopoverController } from '@ionic/angular';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { UtilsService } from 'src/app/services/utils.service';
import { WalletService } from 'src/app/services/wallet.service';
import { SettingsBoxComponent } from './settings-box/settings-box.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild(IonSelect) selectNetwork: IonSelect;
  public logo = faRocket;
  public exLink = faExternalLinkAlt;
  public wallet: PublicKey = null;
  public balance: any = 0;
  LAMPORTS_PER_SOL = LAMPORTS_PER_SOL;
  constructor(
    private popoverController: PopoverController,
    public walletService: WalletService,
    public utilsService: UtilsService
  ) { }

  ngOnInit(): void {

    this.walletService.currentWallet$.subscribe(async (wallet) => {
      this.wallet = wallet;
      if(this.wallet){
        this.balance = await this.walletService.con.getBalance(this.wallet);
        this.balance = (this.balance / LAMPORTS_PER_SOL).toFixed(2)
      }
    })
  }
  async openSettingBox(ev: any) {
    const popover = await this.popoverController.create({
      component: SettingsBoxComponent,
      cssClass: 'setting-box',
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
  async openWalletConnector() {
    await this.walletService.connectWithProvider()
  }


  public myWallet() {
    window.open(`https://explorer.solana.com/address/${this.wallet.toBase58()}?cluster=${this.walletService.networkSubject.value.name}`);
  }


}
