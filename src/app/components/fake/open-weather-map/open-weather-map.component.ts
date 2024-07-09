import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AjaxService } from '../../../services/ajax.service';
import { ApiService } from '../../../services/api.service';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-open-weather-map',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './open-weather-map.component.html',
  styleUrl: './open-weather-map.component.scss'
})
export class OpenWeatherMapComponent {
  weatherData: any;
  location: any;
  constructor(
    private apiService:ApiService,
    private ajaxService:AjaxService,
    private sanitizer: DomSanitizer,
    private dataService:DataService
  ){}

  ngOnInit(){}
  getWeather(){
    const {API_CONFIG,API_URLs}=this.apiService;
    const url = `${API_URLs.getWeather(this.location)}`;
    let config = {
      url:url,
      cacheKey:false
    }
    this.ajaxService.getWithCache(config).subscribe((data:any)=>{
      this.weatherData = data;
    })
  }
}
