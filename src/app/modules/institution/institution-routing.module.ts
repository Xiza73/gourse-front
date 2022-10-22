import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstitutionDetailComponent } from './pages/institution-detail/institution-detail.component';
import { InstitutionSearchComponent } from './pages/institution-search/institution-search.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'busqueda',
        component: InstitutionSearchComponent
      },
      {
        path: 'detalle/:id',
        component: InstitutionDetailComponent
      },
      {
        path: '**',
        redirectTo: 'busqueda'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstitutionRoutingModule { }
