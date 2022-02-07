import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { TransactionService } from 'src/app/services/transaction.service';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-pool',
  templateUrl: './pool.component.html',
  styleUrls: ['./pool.component.scss']
})
export class PoolComponent implements OnInit {
  poolIcon = faBolt
  @Input('currentWallet') wallet;
  LAMPORTS_PER_SOL = LAMPORTS_PER_SOL
  selectedActiveStakeAccount
  selectedstSOLwallet;
  activeStakeAccounts: any[] = null;
  stSOLwallets: any[] = null;
  constructor(
    private walletService: WalletService,
    private transactionService: TransactionService
  ) { }
  ngOnInit(): void {
    this.wallet = this.walletService.walletController ? this.walletService.walletController.publicKey : null;
    if(this.wallet){
      this.getPoolStakeAccounts()
    }
    this.walletService.currentWallet$.subscribe(async (wallet) => {
      this.getPoolStakeAccounts()
    })
   }
   async getPoolStakeAccounts(){
    const stakeAccounts = await this.walletService.getStakeAccountsByOwner().toPromise();
    this.activeStakeAccounts = stakeAccounts.filter((acc: any) => acc.account.data.parsed.type == 'delegated')
    console.log(this.activeStakeAccounts)
    const tokensByOwner = (await this.walletService.getTokensOwner()).tokenAccountsFiltered;
    this.stSOLwallets = tokensByOwner.filter(wallet => wallet.name == 'OLD stSOL' || wallet.name == 'stSOL' )
   }

  setSelectedActiveStakeAccount(ev) {
    this.selectedActiveStakeAccount = ev.detail.value;
  }
  setSelectedstSOLwallet(ev){
    this.selectedstSOLwallet = ev.detail.value
  }
  joinPool() {
    const selected_activeStakeAccount = this.selectedActiveStakeAccount;
    const selected_stSOL_wallet = this.selectedstSOLwallet.address;
    this.transactionService.depositToStakePOOL(selected_activeStakeAccount, selected_stSOL_wallet)
    
  }
}
