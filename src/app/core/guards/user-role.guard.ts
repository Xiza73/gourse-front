import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class UserRoleGuard implements CanActivate {
  constructor(
    private router: Router,
    private tokenService: TokenService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot): boolean {
    
    const currentPath = route.routeConfig?.path;
    const isAuthenticated = this.tokenService.isLogged();
    const role = this.tokenService.getRoleFromToken();

    if (!isAuthenticated) {
      if (currentPath === 'admin') {
        this.router.navigate(['/']);
        return false;
      } else {
        return true;
      }
    } else {
      if (role === 'client' && currentPath === 'admin') {
        this.router.navigate(['/']);
        return false;
      } else if (role === 'client' && currentPath !== 'admin') {
        return true;
      } else if (role !== 'client' && currentPath === 'admin') {
        return true;
      } else {
        this.router.navigate(['/admin']);
        return false;
      }
    }

  }
}
