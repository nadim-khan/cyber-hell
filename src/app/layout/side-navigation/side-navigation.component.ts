import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-side-navigation',
  standalone: true,
  imports: [CommonModule,RouterModule, RouterOutlet,],
  templateUrl: './side-navigation.component.html',
  styleUrl: './side-navigation.component.scss'
})
export class SideNavigationComponent {
  dispaly = '';

  FakeApiList=[
    {id:0,apiName:'JSONPlaceholder',apiUrl:'json'},
    {id:1,apiName:'The Dog API',apiUrl:'dogApi'},
    {id:2,apiName:'REST Countries',apiUrl:'countries'},
    {id:3,apiName:'SpaceX API',apiUrl:'spaceX'},
    {id:4,apiName:'OpenWeatherMap',apiUrl:'OpenWeatherMap'},
    {id:5,apiName:'CoinGecko API',apiUrl:'coinGecko'},
    {id:6,apiName:'JokeAPI',apiUrl:'joke'},
    {id:7,apiName:'NewsAPI',apiUrl:'news'},
    {id:8,apiName:'BoredAPI',apiUrl:'bored'},
  ];

  goRestApiList = [
    {id:0,apiName:'Users',apiUrl:'json'},
    {id:1,apiName:'All Post',apiUrl:'dogApi'},
    {id:2,apiName:'MyPost',apiUrl:'countries'},
  ]
  constructor(
    private  router: Router){
      router.events.subscribe((val) => {
        // see also 
        console.log(router.url ) 
        let arr= router.url.split('/');
        this.dispaly = arr[arr.length-1];
    });
  }



}
