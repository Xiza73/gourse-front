import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstitutionRoutingModule } from './institution-routing.module';
import { InstitutionDetailComponent } from './pages/institution-detail/institution-detail.component';
import { InstitutionSearchComponent } from './pages/institution-search/institution-search.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SwiperModule } from "swiper/angular";


@NgModule({
  declarations: [
    InstitutionDetailComponent,
    InstitutionSearchComponent
  ],
  imports: [
    CommonModule,
    InstitutionRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    SharedModule,
    NgxSpinnerModule,
    SwiperModule
  ]
})
export class InstitutionModule { }
