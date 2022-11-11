import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { NavComponent } from './components/nav/nav.component';
import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AdminSidenavComponent } from './components/admin-sidenav/admin-sidenav.component';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { AdminFooterComponent } from './components/admin-footer/admin-footer.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FeedbackModalComponent } from './components/nav/feedback-modal/feedback-modal.component';
//import { CheckOutModule } from '../modules/checkout-page/checkout-page.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

const layouts = [
  AdminLayoutComponent,
  AuthLayoutComponent,
  ContentLayoutComponent,
];

@NgModule({
  declarations: [
    AdminSidenavComponent,
    AdminHeaderComponent,
    AdminFooterComponent,
    FooterComponent,
    NavComponent,

    ...layouts,
    FeedbackModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatInputModule,
    MatMenuModule,
    FontAwesomeModule,
    //  CheckOutModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [...layouts],
})
export class LayoutModule {}
