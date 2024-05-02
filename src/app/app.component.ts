import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TopNavigationComponent } from './layout/top-navigation/top-navigation.component';
import { SideNavigationComponent } from './layout/side-navigation/side-navigation.component';
import { FooterComponent } from './layout/footer/footer.component';
import { RightViewComponent } from './layout/right-view/right-view.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'cyberhell';
}
