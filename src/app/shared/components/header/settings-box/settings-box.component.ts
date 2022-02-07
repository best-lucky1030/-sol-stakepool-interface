import { Component, OnInit, ViewChild } from '@angular/core';
import { faWifi } from '@fortawesome/free-solid-svg-icons';
import { IonSelect } from '@ionic/angular';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-settings-box',
  templateUrl: './settings-box.component.html',
  styleUrls: ['./settings-box.component.scss']
})
export class SettingsBoxComponent implements OnInit {
  public networks = faWifi;
  public cluster = this.walletService.networkSubject.value
  public provider = this.walletService.providerSubject.value;
  constructor(public walletService: WalletService) { }

  ngOnInit(): void {
  }
  onClusterChange(ev) {
    this.walletService.networkSubject.next(ev.detail.value)
  }
  onProviderChange(ev) {
    this.walletService.providerSubject.next(ev.detail.value)
  }
}
