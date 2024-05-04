import { Injectable } from '@angular/core';
import { Subject, of, throwError, Observable, EMPTY, BehaviorSubject } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';


import { AllUsers, User } from '../utils/Interfaces/interface';
import { Constants } from '../utils/constants/constant';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  _loggedInUser : any ;
  isUserAvailable: boolean=false;

  getUserInfo(){
    let user:any =sessionStorage.getItem('loggedInUser');
    this._loggedInUser = JSON.parse(user);
    if(!this._loggedInUser){
      return null
    }
    this.isUserAvailable =this._loggedInUser.hasOwnProperty('status') && this._loggedInUser.status.toLowerCase() === 'active';
    return this._loggedInUser;
  }

  isAuthenticatedUser(){
    this.getUserInfo();
    return this.isUserAvailable;
  }

  get loggerInUser(){
    return this.getUserInfo()
  }

  set loggedInUser(data:any){
    sessionStorage.setItem('loggedInUser',JSON.stringify(data));
    this._loggedInUser = data;
  }
}
