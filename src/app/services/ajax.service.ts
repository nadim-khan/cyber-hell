
/**
 * @file : ajax.service
 * ============================================+
 * Ajax Service: define common methods for
 * - GET
 * - POST
 * - PUT
 * - DELETE
 * ============================================+
 */

import { Injectable } from '@angular/core';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { startWith, retry, catchError, tap } from 'rxjs/operators';
import { throwError, of } from 'rxjs';
import { Constants } from '../utils/constants/constant';

export function cacheable(params = { collection: true }) {
    let isRouteChanged = sessionStorage.getItem('isRouteChanged');
    return function cacheabledescriptor(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        const cache = new Map();
        const original = descriptor.value;

        descriptor.value = function (...params: any) {
            const stringify = JSON.stringify(params);
            isRouteChanged = sessionStorage.getItem('isRouteChanged');
            if (isRouteChanged) {
                cache.clear()
            }
            const request: Observable<any> = original.apply(this, params);
            if (cache.has(stringify) && isRouteChanged !== 'true') {
                return of(cache.get(stringify));
            }

            return request.pipe(tap(response => {
                sessionStorage.setItem('isRouteChanged', 'false');
                cache.set(stringify, response);
            }));
        }

        return descriptor;
    }
}

@Injectable({
    providedIn: 'root'
})

/**
 * @class AjaxService
 * @desc Ajax Service: define common methods for
 * - GET
 * - POST
 * - PUT
 * - DELETE
 */
export class AjaxService {

    constructor(private httpClient: HttpClient) { }

    /**
     * @method get
     * @desc Common method for making HTTP GET call and returns `Observable`.
     * @param {object} config config object for making ajax call having details like `url`, `headers` etc.
     * @return {Observable} response returned as observable
     */
    get(config: any): Observable<any> {

        // HTTP Param instance
        const params = new HttpParams();

        // If any params in config to override
        if (config.params) {
            for (const param of config.params) {
                params.append(param, config.params[param]);
            }
        }

        // Http headers instance with any headers to add / override in config
        const headers = config.headers ? new HttpHeaders({
            ...config.headers,
            'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
        }) : new HttpHeaders({
            'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
        });

        // API `url` from config
        const url = config.url;

        // Making GET call
        let response = this.httpClient.get(url, { params, headers })
            .pipe(
                // retry(0),
                catchError(this.handleError)
            );

        if (config.cacheKey) {
            response.subscribe(next => {
                sessionStorage[config.cacheKey] = JSON.stringify(next);
            });

            response = response.pipe(
                startWith(JSON.parse(sessionStorage[config.cacheKey] || '[]'))
            );
        }

        return response;
    }

    @cacheable()
    getWithCache(config: any): Observable<any> {

        // HTTP Param instance
        const params = new HttpParams();

        // If any params in config to override
        if (config.params) {
            for (const param of config.params) {
                params.append(param, config.params[param]);
            }
        }

        // Http headers instance with any headers to add / override in config
        const headers = config.headers ? new HttpHeaders({
            ...config.headers,
            'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
        }) : new HttpHeaders({
            'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
        });

        // API `url` from config
        const url = config.url;

        // Making GET call
        let response = this.httpClient.get(url, { params, headers })
            .pipe(
                // retry(0),
                catchError(this.handleError)
            );

        if (config.cacheKey) {
            response.subscribe(next => {
                sessionStorage[config.cacheKey] = JSON.stringify(next);
            });

            response = response.pipe(
                startWith(JSON.parse(sessionStorage[config.cacheKey] || '[]'))
            );
        }

        return response;
    }

    @cacheable()
    postWithCache(config: any): Observable<any> {

        // HTTP Param instance
        const params = new HttpParams();

        // If any params in config to override
        if (config.params) {
            for (const param of config.params) {
                params.append(param, config.params[param]);
            }
        }

        // Http headers instance with any headers to add / override in config
        const httpOptions = config.nohttpOptions ? {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
            }),
        } : {
            withCredentials: false,
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
                // ...config.headers
            }),
        };

        // API `url` from config
        const url = config.url;

        // Making GET call
        let response = this.httpClient.post(url, config.data, httpOptions)
            .pipe(
                // retry(0),
                catchError(this.handleError)
            );

        if (config.cacheKey) {
            response.subscribe(next => {
                sessionStorage[config.cacheKey] = JSON.stringify(next);
            });

            response = response.pipe(
                startWith(JSON.parse(sessionStorage[config.cacheKey] || '[]'))
            );
        }

        return response;
    }


    handleError(error: any) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        // window.alert(errorMessage);
        return throwError(errorMessage);
    }

    /**
     * @method post
     * @desc Common method for making HTTP POST call and returns `Observable`.
     * @param {object} config config object for making ajax call having details like `url`, `headers` etc.
     * @return {Observable} response returned as observable
     */
    post(config: any): Observable<any> {
        const httpOptions = config.nohttpOptions ? {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
            }),
        } : {
            withCredentials: false,
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
                // ...config.headers
            }),
        };

        // API `url`
        const url = config.url;
        const response = this.httpClient.post(url, config.data, httpOptions);
        return response;
    }

    postWithBlob(config: any): Observable<any> {
        const httpOptions = config.nohttpOptions ? {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
            }),
        } : {
            withCredentials: false,
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
                // ...config.headers
            }),
        };



        // API `url`
        const url = config.url;
        const response = this.httpClient.post(url, config.data, httpOptions);
        return response;
    }

    postcountryCode(config: any): Observable<any> {
        const httpOptions = config.nohttpOptions ? {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
                // 'countryCode': 'KE'
            }),
        } : {
            withCredentials: false,
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
                // 'countryCode': 'KE'
                // ...config.headers
            }),
        };

        // API `url`
        const url = config.url;
        const response = this.httpClient.post(url, config.data, httpOptions);
        return response;
    }

    postWithMultiPart(config: any): Observable<any> {

        const httpOptions = config.nohttpOptions ? {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
            }),
        } : {
            withCredentials: false,
            headers: new HttpHeaders({
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
                // ...config.headers
            }),
        };

        // API `url`
        const url = config.url;
        const response = this.httpClient.post(url, config.data, httpOptions);
        return response;
    }

    postWithoutContentType(config: any): Observable<any> {

        const httpOptions = config.nohttpOptions ? {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
            }),
        } : {
            withCredentials: false,
            headers: new HttpHeaders({
                'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
                // ...config.headers
            }),
        };

        // API `url`
        const url = config.url;
        const response = this.httpClient.post(url, config.data, httpOptions);
        return response;
    }

    /**
     * @method put
     * @desc Common method for making HTTP PUT call and returns `Observable`.
     * @param {object} config config object for making ajax call having details like `url`, `headers` etc.
     * @return {Observable} response returned as observable
     */
    put(config: any): Observable<any> {
        const httpOptions = {
            withCredentials: false,
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
            })
        };

        // API `url` from config
        const url = config.url;
        const response = this.httpClient.put(url, config.data, httpOptions);
        return response;
    }

    /**
     * @method delete
     * @desc Common method for making HTTP DELETE call and returns `Observable`.
     * @param {object} config config object for making ajax call having details like `url`, `headers` etc.
     * @return {Observable} response returned as observable
     */
    delete(config: any): Observable<any> {
        const httpOptions = {
            withCredentials: false,
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Constants.TOKEN}`,
            }),
            body: config.data
        };

        // API `url` from config
        const url = config.url;
        const response = this.httpClient.delete(url, httpOptions);
        return response;
    }

    downloadFile(url: any): Observable<any> {
        let response = this.httpClient.get(url,
            {
                responseType: 'blob',
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
                })

            }
        );
        return response;
    }

    downloadFileWithPost(url: any, payload: any): Observable<any> {
        let response = this.httpClient.post(url, payload, {
            responseType: 'blob',
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
            })
        });
        return response;
    }


}