import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { RightViewComponent } from '../right-view/right-view.component';
import { SideNavigationComponent } from '../side-navigation/side-navigation.component';
import { TopNavigationComponent } from '../top-navigation/top-navigation.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-landing',
  standalone: true,
  imports: [TopNavigationComponent,SideNavigationComponent,RightViewComponent,FooterComponent,RouterOutlet],
  templateUrl: './layout-landing.component.html',
  styleUrl: './layout-landing.component.scss'
})
export class LayoutLandingComponent {

}
