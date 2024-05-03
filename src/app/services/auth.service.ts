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
  loginUser: any;
  regUser: any;
  token: string | null | undefined;
  userInfo: any;
  isAdmin = false;
  broadcastAvailable = new BehaviorSubject(false);
  // URL definition (api- path, auth-feature(user,finace,etc..), register - action)
  private apiUrl = 'http://localhost:4050/api/auth';
  private user$ = new Subject<User|null>();

  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService
  ) {
    this.checkLoginStatus();
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('currentUser');
    if (this.jwtHelper.isTokenExpired(token)) {
      return false;
    } else {
      return true;
    }
    // Check whether the token is expired and return
    // true or false
  }

  checkLoginStatus() {
    this.token = localStorage.getItem('currentUser');
    if (this.token) {
      const foundUser = { token: this.token, user: this.jwtHelper.decodeToken(this.token) };
      console.log('foundUser : ', foundUser);
      this.setUser(foundUser);
      return of(foundUser);
    } else {
      return of(null);
    }
  }

  login(email: string, password: string) {
    const loginCredentials = { email, password };
    return this.http.post<User>(`api/auth/login`, loginCredentials)
      .pipe(
        switchMap(foundUser => {
          this.setUser(foundUser);
          console.log('User Logged In  : ', foundUser);
          localStorage.setItem('currentUser', foundUser.token);
          return of(foundUser);
        }),
        catchError(e => {
          console.log('Server error occured : ', e);
          return throwError('Login error occured , Please try again !');
        })
      );
  }

  logout() {
    // remove user from Subject
    localStorage.removeItem('currentUser');
    this.setUser(null);
    this.checkLoginStatus();
    console.log('User has been logged out');
  }

  register(user: any) {
    return this.http.post(`${this.apiUrl}/register`, user)
      .pipe(
        switchMap(savedUser => {
          let x:any=savedUser;
          this.setUser(x);
          console.log('User Registered successfully : ', user);
          return of(savedUser);
        }),
        catchError(e => {
          console.log('Server error occured : ', e);
          return throwError('Registration error occured , Please contact admin !');
        })
      );
  }
  getAllUsersList(): Observable<AllUsers[]> {
    return this.http.get<AllUsers[]>(`${this.apiUrl}/getAllUsers`);
  }

  get User() {
    this.user$.asObservable().subscribe(res => {
      const userData = res;
      if (userData) {
      } else {
        this.isAdmin = false;
      }
    });
    return this.user$.asObservable();
  }

  setUser(user: User|null) {
    this.user$.next(user);
  }



  updateUserDetails(updates: any) {
    return this.http.post<User>(`${this.apiUrl}/updateUser`, updates);
  }

}
