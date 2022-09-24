import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { InstitutionsComponent } from './pages/institutions/institutions.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  {
    path: 'inicio',
    component: DashboardComponent
  },
  {
    path: 'usuarios',
    component: UsersComponent
  },
  {
    path: 'instituciones',
    component: InstitutionsComponent
  },
  {
    path: '**',
    redirectTo: 'inicio'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
