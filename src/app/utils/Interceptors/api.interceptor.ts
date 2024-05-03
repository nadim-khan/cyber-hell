import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, finalize, map } from 'rxjs';
import { Constants } from '../constants/constant';
import { LoaderService } from '../../services/loader.service';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
    
    constructor(private loaderService:LoaderService) { 
        this.loaderService.showLoader();
    }
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        this.loaderService.showLoader();
        request = request.clone(
            {
                headers: request.headers.set('Authorization', `Bearer ${Constants.TOKEN}`)
            });
        return next.handle(request).pipe(
            finalize(() => this.loaderService.hideLoader()),
      );
    }
}
