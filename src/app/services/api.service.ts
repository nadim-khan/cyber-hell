/**
 * @file : api.service
 * ============================================+
 * API Service: define one place for all API urls
 * and configuration
 * ============================================+
 */

import { Injectable } from '@angular/core';
import { Constants } from '../utils/constants/constant';

/**
 * @const {object} API_CONFIG
 * @desc define constant for API calls
 */

const API_CONFIG = {
    API_HOST: Constants.ECART_URL, 
};

const api = 'api/';
const ver = 'v1/';
const admin = `admin`;

/**
 * @const {object} API
 * @desc List of all API urls
 */
const API_URLS = {
    program_info: `aa/${ver}/program/setup`,
    // program_info_dropdown_values: `${profile}/program/getallmasters`,
    program_data: (id:any) => `aa/${api}/program/ss?id=${id}`,
   
};

function constructUrl(data:any) {
    const ret = [];
    for (let d in data)
        ret.push(encodeURIComponent(d) + '=' + data[d]);
    return ret.join('&');
}

@Injectable({
    providedIn: 'root'
})

/**
 * @class ApiService
 * @desc Provides API Configuration (Url, Host)
 * for Application to make HTTP API calls
 */
export class ApiService {
    isActivate: boolean = false;
    constructor() { }

    /**
     * @prop API_URLs
     * @return {object} API_URLS object with api urls;
     */
    get API_URLs() {
        return API_URLS;
    }

    /**
     * @prop API_CONFIG
     * @return {object} API_CONFIG object with api configuration e.g HOST value;
     */
    get API_CONFIG() {
        return API_CONFIG;
    }
}