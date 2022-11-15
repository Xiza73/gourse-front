import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';
import { CourseSearchComponent } from './pages/course-search/course-search.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CourseSearchItemComponent } from './components/course-search-item/course-search-item.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FeedbackModalComponent } from './pages/course-detail/feedback-modal/feedback-modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { EditmodalComponent } from './pages/course-detail/edit-modal/editmodal.component';

@NgModule({
  declarations: [
    CourseDetailComponent,
    CourseSearchComponent,
    CourseSearchItemComponent,
    FeedbackModalComponent,
    EditmodalComponent,
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    FontAwesomeModule,
    MatButtonModule,
    MatInputModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    MatIconModule
  ],
})
export class CourseModule {}
