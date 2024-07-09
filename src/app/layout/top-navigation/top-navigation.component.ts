import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AjaxService } from '../../services/ajax.service';
import { ApiService } from '../../services/api.service';
import { DataService } from '../../services/data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-top-navigation',
  standalone: true,
  imports: [RouterModule, RouterOutlet, CommonModule,FormsModule],
  templateUrl: './top-navigation.component.html',
  styleUrl: './top-navigation.component.scss'
})
export class TopNavigationComponent {
  _userDetails: any;
  mypost:any;
  countryList:any;
  selectedCountry='';
  url ='';
  get userDetails(): boolean {
    return this._userDetails;
  }
  @Input() set userDetails(value: boolean) {
    if(!value || value===undefined || (value && this._userDetails && JSON.stringify(value)===JSON.stringify(this._userDetails))){
      return
    }
    this._userDetails = value;
    this.getAllUserPost();
    this.getAllUserToDo();
    this.getAllCountries();
  }

  constructor(
    private apiService:ApiService,
    private ajaxService:AjaxService,
    private router:Router,
    private dataService:DataService
  ){
      router.events.subscribe((val) => {
        // see also 
        let arr= router.url.split('/');
        this.url = arr[arr.length-1];
    });

    this.dataService._emptyNewsCountrySig.subscribe(data=>{
      if(data && this.countryList && this.countryList.length)
      this.countryList = this.countryList.filter((country:any)=>!data.includes(country.cca2.toLowerCase()))
    })
    }

  ngOnInit() {
  }

  getAllUserPost(){
    const {API_CONFIG,API_URLs}=this.apiService;
    const url = `${API_CONFIG.GO_REST_HOST}${API_URLs.getPostsByUser(this._userDetails.id)}`;
    let config = {
      url:url,
      cacheKey:false
    }
    this.ajaxService.getWithCache(config).subscribe((data:any)=>{
      this.mypost =data;
    })
  }

  getAllCountries(){
    const {API_CONFIG,API_URLs}=this.apiService;
    const url = `${API_URLs.getAllCountries}`;
    let config = {
      url:url,
      cacheKey:false
    }
    this.ajaxService.getWithCache(config).subscribe((data:any)=>{
      this.countryList =data;
      this.dataService.allCountryList = data;
    })
  }

  getAllUserToDo(){

  }

  onCountryChange(ev:any){
    this.dataService._selectedCountrySig.next({currentCountry:this.selectedCountry})
  }
}
