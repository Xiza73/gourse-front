import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstitutionRoutingModule } from './institution-routing.module';
import { InstitutionDetailComponent } from './pages/institution-detail/institution-detail.component';
import { InstitutionSearchComponent } from './pages/institution-search/institution-search.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SwiperModule } from "swiper/angular";
import { FeedbackModalComponent } from './pages/institution-detail/feedback-modal/feedback-modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    InstitutionDetailComponent,
    InstitutionSearchComponent,
    FeedbackModalComponent
  ],
  imports: [
    CommonModule,
    InstitutionRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTooltipModule,
    MatDialogModule,
    SharedModule,
    NgxSpinnerModule,
    SwiperModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
  ]
})
export class InstitutionModule { }
