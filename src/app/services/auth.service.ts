import { Injectable } from '@angular/core';

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
