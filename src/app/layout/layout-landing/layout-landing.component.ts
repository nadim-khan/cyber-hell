import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { RightViewComponent } from '../right-view/right-view.component';
import { SideNavigationComponent } from '../side-navigation/side-navigation.component';
import { TopNavigationComponent } from '../top-navigation/top-navigation.component';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout-landing',
  standalone: true,
  imports: [TopNavigationComponent,SideNavigationComponent,RightViewComponent,FooterComponent,RouterOutlet,CommonModule],
  templateUrl: './layout-landing.component.html',
  styleUrl: './layout-landing.component.scss'
})
export class LayoutLandingComponent {
  constructor(private authService:AuthService){}
  loggedInUser : any ;
  isUserAvailable: boolean=false;

  getUserInfo(){
    this.loggedInUser = this.authService.getUserInfo();
    this.isUserAvailable =this.authService.isAuthenticatedUser();
    return null
  }

}
