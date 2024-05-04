import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-side-navigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-navigation.component.html',
  styleUrl: './side-navigation.component.scss'
})
export class SideNavigationComponent {
   dispaly = '';
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
