import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, distinctUntilChanged, map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { ToastMessageService } from './toast-message.service';

import {
  Connection,
  clusterApiUrl,
  PublicKey,
  ConfirmedSignatureInfo,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';
import Wallet from "@project-serum/sol-wallet-adapter";
import { Token } from '../models/token';

export type ENV = "mainnet-beta" | "testnet" | "devnet" | "localnet";

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  public TOKEN_PROGRAM_ID: PublicKey = new PublicKey(
    "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
  );
  public STAKE_PROGRAM_ID: PublicKey = new PublicKey(
    "Stake11111111111111111111111111111111111111"
  );
  public Sysvar_clock: PublicKey = new PublicKey(
    "SysvarC1ock11111111111111111111111111111111"
  );
  public Sysvar_stake_history: PublicKey = new PublicKey(
    "SysvarStakeHistory1111111111111111111111111"
  );
  public WRAPPED_SOL_MINT = new PublicKey(
    'So11111111111111111111111111111111111111112',
  );
  public MEMO_PROGRAM_ID = new PublicKey(
    'Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo',
  );
  public SMART_POOL_PROGRAM_ACCOUNT_ID = new PublicKey(
    'E2wGYXEPw46FdJWL1MfRoN3JhQY4w6Dmaz9s4ehV2483'
  )
  public STAKE_POOL_STATE_ACCOUNT = new PublicKey(
    'C3WQybyZc45bhRP4PJnM7JhKQFXmqQR5eWr8n8Lxjgex'
  );
  public ST_SOL_MINT_ACCOUNT = new PublicKey(
    '21ofzqmgounc8bX4CK6j3Ff4zjvX6GmRykUnJAU96zKz'
  );
  public LIQ_POOL_STATE_ACCOUNT = new PublicKey(
    'rxTBFFRfwcgx5YedbwLcKntCwMs9tJoQvzYmRnbpLKS'
  );
  public LIQ_POOL_WSOL_ACCOUNT = new PublicKey(
    '2G3TZSRxmPtuwrdcXMQMjzKdebSXuXrPaupVGzZ1Ssf3'
  );
  public LIQ_POOL_ST_SOL_ACCOUNT = new PublicKey(
    '9ipM64eAyTtV5mY27qrdAe5x143QfcjuDRWp72EZBeez'
  );
  public META_LP_MINT_ACCOUNT = new PublicKey(
    'EYbFdPKbRa3MxGxQy9YgFSFs7448Gq17fWRYSeNhVNtq'
  );
  public PDA_LIQ_POOL_AUTHORITY = new PublicKey(
    'GZMs49Ab3qipCShUrET7XwRwTc383ZtbKRpRb4XpkgJE'
  );
  public STAKE_POOL_DEPOSIT_AUTHORITY = new PublicKey(
    'Lr45T8qwy6a6FRG3LxZ3eBHiPveF2Sos4nypTquVyYx'
  );
  public POOL_WITHDRAW_AUTHORITY = new PublicKey(
    'BepTWihwFSMgqDchwGhkSiYTkzHUC2urG9tVpwxCW7vg'
  );
  public VALIDATOR_STAKE_LIST = new PublicKey(
    '14brXrbKoL2ahUKGBRubXUDPAAvHDBGEmVnFrQgoE1f7'
  )
  public VALIDATORS_VOTE_ACCOUNTS = [
    new PublicKey('2HUKQz7W2nXZSwrdX5RkfS2rLU4j1QZLjdGCHcoUKFh3'),
    new PublicKey('87QuuzX6cCuWcKQUFZFm7vP9uJ72ayQD5nr6ycwWYWBG'),
  ]
  public STAKE_ACCOUNT_POOL_OWNED_1 = new PublicKey(
    'EUuiYECwpBMp1FMeKaGXKZggFkRCEoHF2oEjrrgs2baU'
  )
  public STAKE_ACCOUNT_POOL_OWNED_2 = new PublicKey(
    '33FQwAUomJxozTnrzeiDxYNJffWZec72fsGQi9wmda9V'
  )
  public ENDPOINTS = [
    {
      name: "mainnet-beta" as ENV,
      endpoint: "https://solana-api.projectserum.com/",
    },
    { name: "testnet" as ENV, endpoint: clusterApiUrl("testnet") },
    { name: "devnet" as ENV, endpoint: clusterApiUrl("devnet") },
    // { name: "localnet" as ENV, endpoint: "http://127.0.0.1:8899" },
  ];
  public WALLET_PROVIDERS = [
    { name: "sollet.io", url: "https://www.sollet.io" },
    { name: 'bonfida', url: 'https://bonfida.com/wallet' }
  ];

  public con: Connection = null;

  public walletController: Wallet = null
  public currentWalletSubject = new Subject<PublicKey>();
  public currentWallet$: Observable<PublicKey> = this.currentWalletSubject
    .asObservable()
  // .pipe(distinctUntilChanged());

  public networkSubject = new BehaviorSubject<any>(this.ENDPOINTS[0] as any);
  public providerSubject = new BehaviorSubject<any>(this.WALLET_PROVIDERS[0] as any);


  constructor(
    private apiService: ApiService,
    private toastMessageService: ToastMessageService
  ) {
    this.networkSubject.subscribe(async val => {
      this.con = await new Connection(this.networkSubject.value.endpoint);
      if (this.walletController) {
        await this.disconnectFromWallet()
      }
    });
  }
  // catch error
  private formatErrors(error: any) {
    this.toastMessageService.msg.next({ message: error, segmentClass: 'toastError' })
    return throwError(error);
  }

  async connectWithProvider() {
    const network = this.networkSubject.value
    const walletProvider = this.providerSubject.value;
    this.walletController = new Wallet(walletProvider.url, network.endpoint);
    this.walletController.on('connect', publicKey => {
      this.currentWalletSubject.next(publicKey)
      this.toastMessageService.msg.next({ message: 'wallet connected', segmentClass: 'toastInfo' });
    });
    this.walletController.on('disconnect', () => {
      this.currentWalletSubject.next(null)
      this.toastMessageService.msg.next({ message: 'wallet disconnected', segmentClass: 'toastInfo' })
    });
    await this.walletController.connect();
  }
  async getTokensOwner(): Promise<any | Token[]> {
    try {
      const tokenAccounts = await this.con.getParsedTokenAccountsByOwner(this.walletController.publicKey, {
        programId: this.TOKEN_PROGRAM_ID
      });

      const tokenAccountsFiltered: Token[] = tokenAccounts.value.map(wallet => {
        const account = wallet.account

        const token: Token = {
          address: wallet.pubkey.toBase58(),
          publicKey: wallet.pubkey,
          name: this.getHardCodedTokenName(account.data.parsed.info.mint),
          amount: account.lamports / LAMPORTS_PER_SOL,
          tokenAmount: account.data.parsed.info.tokenAmount || null,
          isNative: account.data.parsed.info.isNative
        }
        return token;
      });

      return { tokenAccounts, tokenAccountsFiltered }
    } catch (error) {
      this.toastMessageService.msg.next({ message: 'fail to return tokens by owner', segmentClass: 'toastError' })
      return false
    }
  }
  private getHardCodedTokenName(name) {
    switch (name) {
      // LEGACY
      case this.ST_SOL_MINT_ACCOUNT.toBase58():
        return 'OLD stSOL';
      case '3XrStMayUhNpsFJzmKyynC99fs1Ppbenpj3kpC77EQEh':
        return 'OLD METALP';
      // CURRENT
      case this.LIQ_POOL_ST_SOL_ACCOUNT.toBase58():
        return 'stSOL'
      case this.META_LP_MINT_ACCOUNT.toBase58():
        return 'METALP'
      case this.WRAPPED_SOL_MINT.toBase58():
        return 'wSOL'
        break;
      default:
        return name;
    }
  }
  private async disconnectFromWallet() {
    await this.walletController.disconnect()
    this.currentWalletSubject.next(null);
  }

  async getWalletHistory(walletPubKey: PublicKey) {
    try {
      const signatures: ConfirmedSignatureInfo[] = await this.con.getConfirmedSignaturesForAddress2(walletPubKey);
      let records: any[] = [];
      let walletHistory = []
      signatures.forEach(signature => {
        records.push(this.con.getConfirmedTransaction(signature.signature));
      });
      records.forEach((record, i) => {
        const from = record?.transaction?.instructions[0]?.keys[0]?.pubkey.toBase58() || null;
        const to = record.transaction?.instructions[0]?.keys[1]?.pubkey.toBase58() || null;;
        const amount = (record.meta?.postBalances[1] - record.meta?.preBalances[1]) / LAMPORTS_PER_SOL || null;
        walletHistory.push({ signature: signatures[i].signature, block: record.slot, amount, from, to } || null)
      });
      return walletHistory;
    } catch (error) {
      console.error(error)
      this.toastMessageService.msg.next({ message: 'failed to retrieve transaction history', segmentClass: 'toastError' })
    }
  }


  public getStakeAccountsByOwner(): Observable<[]> {
    var raw = {
      "jsonrpc": "2.0",
      "id": 1,
      "method": "getProgramAccounts",
      "params": [
        "Stake11111111111111111111111111111111111111",

        {
          "encoding": "jsonParsed",
          "filters": [
            {
              "memcmp": {
                "offset": 12,
                "bytes": this.walletController.publicKey.toBase58()
              }
            }
          ]
        }
      ]
    }
    return this.apiService.post(this.networkSubject.value.endpoint, raw).pipe(
      map((data) => {
        return data.result;
      }),
      catchError((error) => this.formatErrors(error))
    );
  }

}