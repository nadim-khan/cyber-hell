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
    GO_REST_HOST: Constants.GO_REST_HOST, 
    GO_REST_METHODS:Constants.GO_REST_METHODS
};

/**
 * @const {object} API
 * @desc List of all API urls
 */
const API_URLS = {
    getUserByID:(userId:number)=>`${API_CONFIG.GO_REST_METHODS.USERS}/${userId}`,
    getAllUsers:(pageNumber:number,pageSize:number)=> `${API_CONFIG.GO_REST_METHODS.USERS}?page=${pageNumber}&per_page=${pageSize}`,
    getAllComments: `${API_CONFIG.GO_REST_METHODS.COMMENTS}`,
    getAllPosts:(pageNumber:number,pageSize:number)=> `${API_CONFIG.GO_REST_METHODS.POSTS}?page=${pageNumber}&per_page=${pageSize}`,
    getAllTodos:(pageNumber:number,pageSize:number)=>`${API_CONFIG.GO_REST_METHODS.TODOS}?page=${pageNumber}&per_page=${pageSize}`,
    getPostsByUser:(userId:number)=>`${API_CONFIG.GO_REST_METHODS.USERS}/${userId}/posts`,
    getCommentsByPostId:(postId:number)=>`${API_CONFIG.GO_REST_METHODS.POSTS}/${postId}/comments`,
    deletePostById:(postId:number)=>`${API_CONFIG.GO_REST_METHODS.POSTS}/${postId}`,
    deleteCommentById:(commentId:number)=>`${API_CONFIG.GO_REST_METHODS.COMMENTS}/${commentId}`
};


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