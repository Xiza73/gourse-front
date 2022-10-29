import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CompleteComponent } from './pages/complete/complete.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'perfil',
        component: ProfileComponent,
      },
      {
        path: 'favoritos',
        component: FavoritesComponent,
      },
      {
        path: 'completados',
        component: CompleteComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
