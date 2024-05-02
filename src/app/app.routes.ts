import { Routes } from '@angular/router';
import { LandingComponent } from './pages/website/landing/landing.component';
import { LoginComponent } from './pages/login/login/login.component';
import { LayoutLandingComponent } from './layout/layout-landing/layout-landing.component';
import { MessageComponent } from './pages/website/message/message.component';
import { RegisterComponent } from './pages/login/register/register.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'viewer',
        pathMatch:'full'
    },
    {
        path:'user',
        component:LayoutLandingComponent,
        children:[
            {
                path:'messages',
                component:MessageComponent
            }
        ]
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'register',
        component:RegisterComponent
    },
    {
        path:'**',
        component:LoginComponent
    }
];
