import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './pages/profile/profile.component';
import { UserRoutingModule } from './user-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CompleteComponent } from './pages/complete/complete.component';



@NgModule({
  declarations: [
    ProfileComponent,
    FavoritesComponent,
    CompleteComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NgxSpinnerModule
  ]
})
export class UserModule { }
