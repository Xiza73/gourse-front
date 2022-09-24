import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { DataSharingService } from 'src/app/core/services/data-sharing.service';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  // Icons
  faUser = faUser;

  isLogged: boolean = false;
  username: string = '';

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private dataSharingService: DataSharingService
  ) { }

  ngOnInit(): void {
    this.isLogged = this.tokenService.isValidToken();

    if (!this.tokenService.isValidToken() || !this.tokenService.getIdFromToken()) {
      this.tokenService.removeToken();
      return;
    }

    this.dataSharingService.username.subscribe(
      value => {
        this.username = value;
      }
    );
  }

  goToProfile() {
    this.router.navigate(['/usuario/perfil']);
  }

  logout(): void {
    this.tokenService.removeToken();
    this.router.navigate(['/login'])
  }

}
