import { Component, ViewChild } from '@angular/core';
import { AjaxService } from '../../../services/ajax.service';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '../../pagination/pagination.component';
import { DataService } from '../../../services/data.service';
import { forkJoin } from 'rxjs';
import { PositiveCheck } from '../../../utils/directives/positiveCheck.directive';
import { PopupComponent } from '../../popup/popup.component';

@Component({
  selector: 'app-coin-gecko',
  standalone: true,
  imports: [CommonModule,FormsModule,PaginationComponent,PositiveCheck,PopupComponent],
  templateUrl: './coin-gecko.component.html',
  styleUrl: './coin-gecko.component.scss'
})
export class CoinGeckoComponent {
  marketData = <any>[];
  pageSize:number = 10;
  pageNumber:number = 1;
  startIndex: number=1;
  countryList=<any>[];
  selectCurrency: any='usd';
  selectedCountryData:any;
  countrySearch = '';
  originalCountryList= <any>[];
  coinInfo:any;
  @ViewChild('popup') popup: PopupComponent | undefined;


  constructor(
    private apiService:ApiService,
    private ajaxService:AjaxService,
    private dataService:DataService
  ){}

  ngOnInit(){
    this.getAllMarketCoinVelue();
    this.countryList = this.dataService.allCountryList;
    this.originalCountryList= this.dataService.allCountryList;
    this.updateCutrrency();
  }
  updateCutrrency(){
    this.countryList.forEach((country:any)=>{
      for(let key in country.currencies){
        country['currencyCode']=key;
      }
    })
  }

  getAllMarketCoinVelue(){
    const {API_CONFIG,API_URLs}=this.apiService;
    const url = `${API_URLs.getCoinGeckoMarket(this.selectCurrency.toLowerCase())}`;
    const coinListUrl = `${API_URLs.getCoinGeckoCoinList}`
    let config = {
      url:url,
      cacheKey:false
    }
    let configList = {
      url:coinListUrl,
      cacheKey:false
    }

    forkJoin([this.ajaxService.getWithCache(config),this.ajaxService.getWithCache(configList)]).subscribe((data:any)=>{
      const object2Map = new Map(data[1].map((obj:any) => [obj.symbol, obj]));

      // Merge the two arrays based on the "symbol" property
      this.marketData = data[0].map((obj1:any) => {
        const obj2 = object2Map.get(obj1.symbol);
        return obj2 ? { ...obj1, ...{coinData:obj2}} : obj1;
      });
    })
  }

  onPageClick(e:any){}

  onCountryChange(e:any){
    this.selectedCountryData = this.countryList.filter((country:any)=>country.currencyCode===e.target.value);
    this.getAllMarketCoinVelue()
  }

  searchCountry(){
    this.countryList=this.originalCountryList.filter((country:any)=>country.name.common.toLowerCase().includes(this.countrySearch.toLowerCase()));
    if(this.countrySearch===''){
      this.countryList = this.originalCountryList;
    }
  }

  getCoinInfo(coinData:any){
    this.coinInfo = [];
    this.openPopup();
    const {API_CONFIG,API_URLs}=this.apiService;
    const url = `${API_URLs.getCoinGeckoCoinById(coinData.coinData.id)}`;
    let config = {
      url:url,
      cacheKey:false
    }
    this.ajaxService.getWithCache(config).subscribe((data:any)=>{
      this.coinInfo = data;
    })
  }
  
  openPopup() {
    if (this.popup) {
      this.popup.show();
    }
  }

  onPopupClose() {
    console.log('Popup closed');
  }
}
