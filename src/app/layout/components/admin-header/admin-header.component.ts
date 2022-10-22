import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataSharingService } from 'src/app/core/services/data-sharing.service';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {
  @Output() onToggleSidebar: EventEmitter<any> = new EventEmitter(); 

  isLogged: boolean = false;
  username: string = '';

  constructor(
    private router: Router,
    private tokenService: TokenService,
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

  toggleSidebar() {
    this.onToggleSidebar.emit();
  }

  goToProfile() {
    this.router.navigate(['/usuario/perfil']);
  }

  logout(): void {
    this.tokenService.removeToken();
    this.router.navigate(['/login'])
  }
}
