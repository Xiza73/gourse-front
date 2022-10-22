import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { switchMap } from 'rxjs/operators';
import { TokenService } from 'src/app/core/services/token.service';
import { ClientService } from 'src/app/data/services/client.service';
import { Client } from 'src/app/data/types/client';
import { Course } from 'src/app/data/types/course';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  public user: Client = {};
  public favorites: Course[] = [];
  public total = -1;

  constructor(
    private tokenService: TokenService,
    private clientService: ClientService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    const userId = this.tokenService.getClientIdFromToken();
    if (userId) {
      this.clientService.readClient(userId)
        .pipe(
          switchMap(response => {
            this.user = response.data;
            return this.clientService.readFavorites(this.user._id!);
          })
        )
        .subscribe(response => {
          this.favorites = response.data;
          this.total = this.favorites.length;
          this.spinner.hide();
        });
    }
  }

}
