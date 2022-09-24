import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AdminService } from 'src/app/data/services/admin.service';
import { ClientService } from 'src/app/data/services/client.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  public username: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private tokenService: TokenService,
    private clientService: ClientService,
    private adminService: AdminService
  ) { 
    if (this.tokenService.isValidToken() && this.tokenService.getIdFromToken()) {
      const role = this.tokenService.getRoleFromToken()!;
      const id = this.tokenService.getIdFromToken()!;
      let obs$: Observable<any>

      if (role === 'client') {
        obs$ = this.clientService.getUserProfile(id);
      } else {
        obs$ = this.adminService.getUserProfile(id);
      }

      obs$.subscribe(
        response => {
          const { username } = response.body.data;
          this.username.next(username);
        }
      );
    }
  }
}
