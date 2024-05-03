import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TopNavigationComponent } from './layout/top-navigation/top-navigation.component';
import { SideNavigationComponent } from './layout/side-navigation/side-navigation.component';
import { FooterComponent } from './layout/footer/footer.component';
import { RightViewComponent } from './layout/right-view/right-view.component';
import { Constants } from './utils/constants/constant';
import { NgxSpinnerComponent, NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'cyberhell';
  constructor(private spinner: NgxSpinnerService,private loaderService:LoaderService){
    this.loaderService.loader.subscribe(data=>{
      if(data){
        this.spinner.show('sp1')
      }else{
        this.spinner.hide('sp1')
      }
    })
  }
  ngOnInit(){
    sessionStorage.setItem('accessToken',Constants.TOKEN);
    this.spinner.show('sp1')
  }
  
}
