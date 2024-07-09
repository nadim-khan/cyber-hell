import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-side-navigation',
  standalone: true,
  imports: [CommonModule,RouterModule, RouterOutlet,],
  templateUrl: './side-navigation.component.html',
  styleUrl: './side-navigation.component.scss'
})
export class SideNavigationComponent {
  dispaly = '';
  loggedInUserData:any;
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
    {id:0,apiName:'Users',apiUrl:'user'},
    {id:1,apiName:'All Post',apiUrl:`post`},
    {id:2,apiName:'MyPost',apiUrl:`post`},
  ]
  constructor(
    private  router: Router, private authService:AuthService){
      router.events.subscribe((val) => {
        // see also 
        let arr= router.url.split('/');
        this.dispaly = arr[arr.length-1];
    });
    this.loggedInUserData = this.authService.loggerInUser;
    if(this.loggedInUserData){
      this.goRestApiList[2].apiUrl = `post/${this.loggedInUserData.id}`;
    }else{
      this.router.navigate(['/viewer/user']);
    }
  }



}
