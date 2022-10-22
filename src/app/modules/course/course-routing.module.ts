import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';
import { CourseSearchComponent } from './pages/course-search/course-search.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'busqueda',
        component: CourseSearchComponent
      },
      {
        path: 'detalle/:id',
        component: CourseDetailComponent
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
export class CourseRoutingModule { }
