import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CreateEditUserComponent } from './components/create-edit-user/create-edit-user.component';
import { InstitutionsComponent } from './pages/institutions/institutions.component';

import { UsersComponent } from './pages/users/users.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from  '@angular/material/input'
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateEditInstitutionComponent } from './components/create-edit-institution/create-edit-institution.component';



@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    InstitutionsComponent,
    CreateEditUserComponent,
    ConfirmDialogComponent,
    CreateEditInstitutionComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatInputModule,
    MatSortModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule,
    SharedModule
  ]
})
export class AdminModule { }
