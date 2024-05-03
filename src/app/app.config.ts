import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import {NgxSpinnerModule } from 'ngx-spinner'
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { APIInterceptor } from './utils/Interceptors/api.interceptor';
import { ɵINTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    ɵINTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
    provideClientHydration(),
    importProvidersFrom(NgxSpinnerModule.forRoot()),
    provideHttpClient(withInterceptorsFromDi()),{
      provide:HTTP_INTERCEPTORS,
      useClass:APIInterceptor,
      multi:true
  } ,
    provideAnimations()
  ]
};
