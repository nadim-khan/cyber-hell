import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../../utils/constants/constant';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*',
    'Authorization':'authkey',
    'userid':'1'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  

  constructor(private http:HttpClient) { 
  }

  login(data:any){
    return this.http.post(Constants.LOGIN_URL+Constants.LOGIN_METHODS.LOGIN,data);
  }

  registerNewUser(data:any){
    return this.http.post(Constants.LOGIN_URL+Constants.LOGIN_METHODS.REGISTER_NEW_USER,data);
  }
}
