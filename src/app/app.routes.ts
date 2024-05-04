import { Routes } from '@angular/router';
import { LandingComponent } from './pages/website/landing/landing.component';
import { LoginComponent } from './pages/login/login/login.component';
import { LayoutLandingComponent } from './layout/layout-landing/layout-landing.component';
import { MessageComponent } from './pages/website/message/message.component';
import { RegisterComponent } from './pages/login/register/register.component';
import { UserComponent } from './pages/website/user/user.component';
import { PostsComponent } from './pages/website/posts/posts.component';
import { TodoComponent } from './pages/website/todo/todo.component';
import { AuthGuard } from './services/auth.guard';

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
                component:UserComponent,
            },
            {
                path:'post',
                component:PostsComponent,
                canActivate:[AuthGuard]
            },
            {
                path:'post/:id',
                component:PostsComponent,
                canActivate:[AuthGuard]
            },
            {
                path:'todo',
                component:TodoComponent,
                canActivate:[AuthGuard]
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
