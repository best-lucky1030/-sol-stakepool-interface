import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { WalletComponent } from './wallet/wallet.component';
import { HistoryComponent } from './history/history.component';
import { SendTokenPopupComponent } from './wallet/send-token-popup/send-token-popup.component';
import { SellStSOLPopupComponent } from './wallet/sell-st-sol-popup/sell-st-sol-popup.component';


const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/home',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    component: HomeComponent
  }
]

@NgModule({
  declarations: [HomeComponent, WalletComponent, HistoryComponent, SendTokenPopupComponent, SellStSOLPopupComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [SharedModule]
})
export class HomeModule { }
