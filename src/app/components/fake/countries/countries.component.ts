import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { AjaxService } from '../../../services/ajax.service';
import { PropertGetterPipe } from '../../../utils/pipes/propertGetter.pipe';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [CommonModule,PropertGetterPipe,FormsModule,ReactiveFormsModule],
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.scss'
})
export class CountriesComponent {
  countryList = <any>[];
  originalCountryList= <any>[];
  regionList = <any>[];
  sanitizedUrl: SafeResourceUrl | undefined;
  activeIndex: number | null = null;
  countrySearch='';
  selectedRegion='';

  constructor(
    private apiService:ApiService,
    private ajaxService:AjaxService,
    private sanitizer: DomSanitizer,
    private dataService:DataService
  ){

  }

  ngOnInit(){
    this.getAllCountries();
  }

  getAllCountries(){
    this.countryList = this.dataService.allCountryList;
    this.originalCountryList = this.dataService.allCountryList;
      this.getRegions();
  }

  getRegions(){
    this.countryList.forEach((country:any )=> {
      this.regionList = [...new Set([...this.regionList,country.region])].sort()
    });
  }

  getSanitizedUrl(url:any){
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  searchCountry(){
    this.selectedRegion='';
    this.activeIndex=-1;
    this.countryList=this.originalCountryList.filter((country:any)=>country.name.common.toLowerCase().includes(this.countrySearch.toLowerCase()))
  }

  toggleAccordion(index: number): void {
    this.activeIndex = this.activeIndex === index ? null : index;
  }

  onRegionChange(event:any){
    this.countrySearch='';
    this.countryList=this.originalCountryList.filter((country:any)=>country.region.toLowerCase()===this.selectedRegion.toLowerCase())
    this.activeIndex=-1;
  }

  goToCountry(name:any){
    
    this.countryList=this.originalCountryList.filter((country:any)=>{
      this.activeIndex = 0;
      return country.cca3===name;
    })
  }

  claerFilters(){
    this.selectedRegion='';
    this.countrySearch='';
    this.countryList=this.originalCountryList;
    this.activeIndex=-1;
  }

}
