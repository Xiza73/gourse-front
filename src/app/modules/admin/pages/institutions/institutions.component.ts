import { AfterViewInit, Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { User } from 'src/app/data/types/user';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { InstitutionService } from 'src/app/data/services/institution.service';
import { CreateEditInstitutionComponent } from '../../components/create-edit-institution/create-edit-institution.component';
import { Institution } from 'src/app/data/types/institution';

@Component({
  selector: 'app-institutions',
  templateUrl: './institutions.component.html',
  styleUrls: ['./institutions.component.scss']
})
export class InstitutionsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'description', 'url', 'email', 'status', 'menu'];
  dataSource = new MatTableDataSource<User>();
  pageSize: number = 10;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort,{ static:true }) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private institutionService: InstitutionService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loadInstitutions();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  newInstitution(): void {
    this.dialog.open(CreateEditInstitutionComponent, {
      data: {
        mode: 'create'
      },
      width: '650px'
    }).afterClosed().subscribe((institution: any) => {
      if (!institution) return;
      this.institutionService.createInstitution(institution).subscribe(
        response => {
          this.loadInstitutions();
          this.toastr.success(response.message, 'Éxito');
        },
        err => {
          this.toastr.error(err.error.message, 'Error');
        }
      )
    });
  }

  editInstitution(institution: Institution): void {
    this.dialog.open(CreateEditInstitutionComponent, {
      data: {
        mode: 'edit',
        institution
      },
      width: '700px'
    }).afterClosed().subscribe((institution: any) => {
      if (!institution) return;
      if (institution === 'no changes') {
        this.toastr.info('No hay datos que actualizar', 'Institución');
        return;
      }
      this.institutionService.updateInstitution(institution).subscribe(
        response => {
          this.loadInstitutions();
          this.toastr.success(response.message, 'Éxito');
        },
        err => {
          this.toastr.error(err.error.message, 'Error');
        }
      )
    });
  }

  deleteInstitution(institution: Institution): void {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar institución',
        message: `¿Está seguro de que desea eliminar el usuario "${institution.name}"?`,
        confirmBtnLabel: 'Eliminar'
      },
      width: '700px'
    }).afterClosed().subscribe((response: any) => {
      if (!response) return
      this.institutionService.deleteInstitution(institution._id!).subscribe(
        response => {
          this.loadInstitutions();
          this.toastr.success(response.message, 'Éxito');
        },
        err => {
          this.toastr.error(err.error.message, 'Error');
        }
      )
    });
  }

  filter(event: Event): void {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }  

  private loadInstitutions(): void {
    this.institutionService.readAllInstitutions()
    .subscribe(
      response => {
        this.dataSource.data = response.data;
      }
    )
  }
}