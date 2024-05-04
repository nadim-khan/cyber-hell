import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-right-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './right-view.component.html',
  styleUrl: './right-view.component.scss'
})
export class RightViewComponent {
  constructor(private authService:AuthService){}
  loggedInUser : any ;
  isUserAvailable: boolean=false;

  getUserInfo(){
    this.loggedInUser = this.authService.getUserInfo();
    this.isUserAvailable =this.authService.isAuthenticatedUser();
    return null
  }
}
