import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { AjaxService } from '../../../services/ajax.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent {
  newsList:any;
  constructor(
    private apiService:ApiService,
    private ajaxService:AjaxService
  ){}

  ngOnInit(){
    this.getAllNews()
  }

  getAllNews(){
    const {API_CONFIG,API_URLs}=this.apiService;
    const url = `${API_URLs.getNews('us')}`;
    let config = {
      url:url,
      cacheKey:false
    }
    this.ajaxService.get(config).subscribe((data:any)=>{
      this.newsList = data.articles;
    })
  }

}
