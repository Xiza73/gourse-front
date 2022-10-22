import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class UserLoggedInGuard implements CanActivate {
  constructor(
    private router: Router,
    private tokenService: TokenService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    const url = state.url;
    const isAuthenticated = this.tokenService.isLogged();

    if (url === '/login' || url === '/register' || url === '/password-recovery'
        || url.startsWith('/new-password')) {

      if (isAuthenticated) {
        this.router.navigate(['/']);
      }
      return !isAuthenticated;

    } else {
      if (!isAuthenticated) {
        this.router.navigate(['/login']);
      }
      return isAuthenticated;
    }
  }
}
