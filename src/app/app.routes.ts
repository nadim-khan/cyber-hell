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
import { JsonComponent } from './components/fake/json/json.component';
import { DogApiComponent } from './components/fake/dog-api/dog-api.component';
import { CountriesComponent } from './components/fake/countries/countries.component';
import { SpaceXComponent } from './components/fake/space-x/space-x.component';
import { OpenWeatherMapComponent } from './components/fake/open-weather-map/open-weather-map.component';
import { CoinGeckoComponent } from './components/fake/coin-gecko/coin-gecko.component';
import { JokeComponent } from './components/fake/joke/joke.component';
import { NewsComponent } from './components/fake/news/news.component';
import { BoredComponent } from './components/fake/bored/bored.component';

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
        path:'fake',
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
            },
            {
                path:'json',
                component:JsonComponent,
                canActivate:[AuthGuard]
            },
            {
                path:'dogApi',
                component:DogApiComponent,
                canActivate:[AuthGuard]
            },
            {
                path:'countries',
                component:CountriesComponent,
                canActivate:[AuthGuard]
            },
            {
                path:'spaceX',
                component:SpaceXComponent,
                canActivate:[AuthGuard]
            },
            {
                path:'OpenWeatherMap',
                component:OpenWeatherMapComponent,
                canActivate:[AuthGuard]
            },
            {
                path:'coinGecko',
                component:CoinGeckoComponent,
                canActivate:[AuthGuard]
            },
            {
                path:'joke',
                component:JokeComponent,
                canActivate:[AuthGuard]
            },
            {
                path:'news',
                component:NewsComponent,
                canActivate:[AuthGuard]
            },
            {
                path:'bored',
                component:BoredComponent,
                canActivate:[AuthGuard]
            },
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
