import { Component } from '@angular/core';
import { AjaxService } from '../../services/ajax.service';
import { ApiService } from '../../services/api.service';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  jokeData: any;
  constructor(
    private apiService:ApiService,
    private ajaxService:AjaxService,
    private dataService:DataService
  ){
    this.getJoke()
  }

  getJoke(){
    const {API_CONFIG,API_URLs}=this.apiService;
    const url = `${API_URLs.getJoke('single')}`;
    let config = {
      url:url,
      cacheKey:false
    }
    this.ajaxService.getWithCache(config).subscribe((data:any)=>{
      this.jokeData = data;
    })
  }

}
