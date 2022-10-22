import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { DataSharingService } from 'src/app/core/services/data-sharing.service';
import { TokenService } from 'src/app/core/services/token.service';
import { ClientService } from 'src/app/data/services/client.service';

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
  isPremium = false;

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private dataSharingService: DataSharingService,
    private readonly toastr: ToastrService,
    private readonly clientService: ClientService,
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
        this.loadPremium();
      }
    );

    this.loadPremium();
  }

  loadPremium(){
    this.clientService.getUserProfile(this.tokenService.getIdFromToken()!).subscribe(
      (res) => {
        const { isPremium } = res.body.data;
        this.isPremium = isPremium;
      },
      (err) => {
        this.toastr.error(err.error.message, 'Error');
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

  goToPremium(){
    if(!this.isLogged){
      this.toastr.show('Primero debes iniciar sesión');
      this.router.navigate(['/login']);
      return;
    }

    this.router.navigate(['/checkout/pag']);
  }
}
