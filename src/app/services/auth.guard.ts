import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  authenticationToken!: any;
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    this.authenticationToken = localStorage.getItem('userToken');
    if (this.authenticationToken) {
      return true;
    } else {
      window.location.replace('/login');
    }
  }
}
