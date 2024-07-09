import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { AjaxService } from '../../../services/ajax.service';
import { CommonModule } from '@angular/common';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent {
  newsList:any;
  code = 'in';
  constructor(
    private apiService:ApiService,
    private ajaxService:AjaxService,
    private dataService:DataService
  ){
    this.dataService._selectedCountrySig.subscribe(data=>{
      this.code=data.currentCountry.toLowerCase()
      this.getAllNews()
    })
  }

  ngOnInit(){
    this.getAllNews()
  }
  

  getAllNews(){
    const {API_CONFIG,API_URLs}=this.apiService;
    const url = `${API_URLs.getNews(this.code)}`;
    let config = {
      url:url,
      cacheKey:false
    }
    this.ajaxService.get(config).subscribe((data:any)=>{
      this.newsList = data.articles;
      if(!data.articles.length){
        let d = this.dataService.countryEmpty;
        d.push(this.code)
        this.dataService._emptyNewsCountrySig.next(d)
          //this.dataService._emptyNewsCountrySig.next([...this.dataService.countryEmpty,this.code])
      }
    })
  }

}
