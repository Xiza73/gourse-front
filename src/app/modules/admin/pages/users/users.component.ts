import { AfterViewInit, Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { CreateEditUserComponent } from '../../components/create-edit-user/create-edit-user.component';
import { UserService } from 'src/app/data/services/user.service';
import { User } from 'src/app/data/types/user';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { AdminService } from 'src/app/data/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { DataSharingService } from 'src/app/core/services/data-sharing.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['username', 'name', 'email', 'role', 'status', 'menu'];
  dataSource = new MatTableDataSource<User>();
  pageSize: number = 10;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static:true }) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private adminService: AdminService,
    private toastr: ToastrService,
    private dataSharingService: DataSharingService
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  newUser(): void {
    this.dialog.open(CreateEditUserComponent, {
      data: {
        mode: 'create'
      },
      width: '650px'
    }).afterClosed().subscribe((user: any) => {
      if (!user) return;
      this.adminService.createUser(user).subscribe(
        response => {
          this.loadUsers();
          this.toastr.success(response.message, 'Éxito');
        },
        err => {
          this.toastr.error(err.error.message, 'Error');
        }
      )
    });
  }

  editUser(user: User): void {
    const isLoggedInUser = this.isLoggedInUser(user);

    this.dialog.open(CreateEditUserComponent, {
      data: {
        mode: 'edit',
        user
      },
      width: '650px'
    }).afterClosed().subscribe((user: any) => {
      if (!user) return;
      if (user === 'no changes') {
        this.toastr.info('No hay datos que actualizar', 'Usuario');
        return;
      }
      this.adminService.updateUser(user).subscribe(
        response => {
          if (isLoggedInUser) {
            this.dataSharingService.username.next(user.username);
          }
          this.loadUsers();
          this.toastr.success(response.message, 'Éxito');
        },
        err => {
          this.toastr.error(err.error.message, 'Error');
        }
      )
    });
  }

  deleteUser(user: User): void {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar usuario',
        message: `¿Está seguro de que desea eliminar el usuario "${user.username}"?`,
        confirmBtnLabel: 'Eliminar'
      },
      width: '600px'
    }).afterClosed().subscribe((response: any) => {
      if (!response) return
      this.adminService.deleteUser(user._id!).subscribe(
        response => {
          this.loadUsers();
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

  private loadUsers(): void {
    this.userService.readUsers('Admin')
    .subscribe(
      response => {
        this.dataSource.data = response.data;
      }
    )
  }

  private isLoggedInUser(user: User): boolean {
    const currentUsername = this.dataSharingService.username.value;
    return currentUsername === user.username;
  }
}