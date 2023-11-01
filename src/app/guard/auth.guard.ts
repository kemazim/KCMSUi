import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('userName') && localStorage.getItem('userId')) {
      // User is logged in, allow navigation
      this.setLogoutTimeout();
      return true;
    } else {
      // User is not logged in, redirect to the login page
      this.router.navigate(['/mainPage']);
      return false;
    }
  }

  setLogoutTimeout() {
    const logoutTime = 60 * 60 * 500; // 1 hour in milliseconds
    setTimeout(() => {
      // Clear localStorage after 1 hour
      localStorage.clear();
      this.router.navigate(['/mainPage']); // Redirect to login page after logout
    }, logoutTime);
  }
}
