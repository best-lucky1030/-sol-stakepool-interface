import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PriceFeedService {
  protected endpoint = 'https://api.coingecko.com/api/v3/simple/price';
  private solUSDvalue = null

  constructor(private apiService: ApiService) { 
    this.getPriceList();
  }
  async getPriceList(tokens?: string[]): Promise<any> {
    const rate = await this.apiService.get(`${this.endpoint}?ids=solana&vs_currencies=usd`).toPromise();
    this._solUSDvalue = rate.solana.usd;
    return rate;
  }
  public set _solUSDvalue(v : number) {
    this.solUSDvalue = v;
  }
  
  
  public get _solUSDvalue() : number {
    return this.solUSDvalue;
  }
  
}
