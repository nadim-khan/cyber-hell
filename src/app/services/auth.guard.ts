/**
 * @file : authguard.service
 * ============================================+
 * API Service: define one place for all API urls
 * and configuration
 * ============================================+
 */

import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanDeactivate, CanLoad, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad  {
  constructor(
    private authService: AuthService,
     private router: Router,
     private toastr:ToastrService
    ) {}

  canActivate(): boolean {
    return this.checkAuth();
  }

  canActivateChild(): boolean {
    return this.checkAuth();
  }

  canLoad(): boolean {
    return this.checkAuth();
  }

  private checkAuth(): boolean {
    if (this.authService.isAuthenticatedUser()) {
      return true;
    } 
    else {
      this.toastr.error('User is InActive', 'Authentication Error', {
        toastClass:'error-toast'
      })
      this.router.navigate(['/viewer/user']);
      return false;
    }
  }

}