import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StakeComponent } from './stake.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

import { StakeAccountsComponent } from './stake-accounts/stake-accounts.component';
import { CreateStakeAccountPopupComponent } from './stake-accounts/create-stake-account-popup/create-stake-account-popup.component';
import { PoolComponent } from './pool/pool.component';
import { DelegatePopupComponent } from './stake-accounts/delegate-popup/delegate-popup.component';
import { WithdrawFromStakeAccountPopupComponent } from './stake-accounts/withdraw-from-stake-account-popup/withdraw-from-stake-account-popup.component';
import { UndelegatePopupComponent } from './stake-accounts/undelegate-popup/undelegate-popup.component';



const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/home',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    component: StakeComponent
  }
]

@NgModule({
  declarations: [StakeComponent,
    StakeAccountsComponent,
    CreateStakeAccountPopupComponent,
    DelegatePopupComponent,
    PoolComponent,
    WithdrawFromStakeAccountPopupComponent,
    UndelegatePopupComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class StakeModule { }
