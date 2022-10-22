import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummarizePipe } from './pipes/summarize.pipe';
import { CourseBoxComponent } from './components/course-box/course-box.component';
import { RouterModule } from '@angular/router';
import { InstitutionBoxComponent } from './components/institution-box/institution-box.component';



@NgModule({
  declarations: [
    SummarizePipe,
    CourseBoxComponent,
    InstitutionBoxComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SummarizePipe,
    CourseBoxComponent,
    InstitutionBoxComponent
  ]
})
export class SharedModule { }
