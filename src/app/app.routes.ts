import { Routes } from '@angular/router';
import { LandingComponent } from './pages/website/landing/landing.component';
import { LoginComponent } from './pages/login/login/login.component';
import { LayoutLandingComponent } from './layout/layout-landing/layout-landing.component';
import { MessageComponent } from './pages/website/message/message.component';
import { RegisterComponent } from './pages/login/register/register.component';
import { UserComponent } from './pages/website/user/user.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'viewer',
        pathMatch:'full'
    },
    {
        path:'viewer',
        component:LayoutLandingComponent
    },
    {
        path:'viewer',
        component:LayoutLandingComponent,
        children:[
            {
                path:'user',
                component:UserComponent
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
