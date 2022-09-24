import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoleService } from 'src/app/data/services/role.service';
import { Admin } from 'src/app/data/types/admin';
import { Role } from 'src/app/data/types/role';
import { User } from 'src/app/data/types/user';

@Component({
  selector: 'app-create-edit-user',
  templateUrl: './create-edit-user.component.html',
  styleUrls: ['./create-edit-user.component.scss']
})
export class CreateEditUserComponent implements OnInit {

  form: FormGroup = this.fb.group({
    name       : ['', [ Validators.required, Validators.maxLength(50), Validators.pattern("[A-Za-záéíóúüñÁÉÍÓÚÜÑ'´ ]+") ]],
    username   : ['', [ Validators.required, Validators.maxLength(50), Validators.pattern("[A-Za-z0-9]+") ]],
    email      : ['', [ Validators.required, Validators.email ]],
    password   : ['', [ Validators.required, Validators.minLength(3) ]],
    newPassword: ['', [ Validators.minLength(3) ]],
    roleId     : ['', [ Validators.required ]],
    status     : ['', [ Validators.required ]]
  })

  hide = true;
  isChecked = true;

  mode: 'create' | 'edit' = 'create';
  user: User = {};
  roles: Role[] = [];
  initialFormValue: any = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<CreateEditUserComponent>,
    private fb: FormBuilder,
    private roleService: RoleService
  ) { }

  ngOnInit(): void {
    this.mode = this.defaults.mode;
    if (this.mode === 'edit') {
      this.user = this.defaults.user;
      this.form.setValue({ 
        name: (this.user.person as Admin).name,
        username: this.user.username,
        email: (this.user.person as Admin).email,
        password: this.user.password,
        newPassword: '',
        roleId: (this.user.role as Role)._id,
        status: this.user.status
      });
      this.initialFormValue = this.form.value;
    }

    this.loadRoles();
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (JSON.stringify(this.initialFormValue) === JSON.stringify(this.form.value)) {
      this.dialogRef.close('no changes');
      return;
    }
    const user = this.form.value;
    this.dialogRef.close({...user, id: this.user._id});
  }

  isRequiredField(field: string): boolean {
    const formControl = this.form.get(field);
    return formControl?.errors?.required && formControl?.touched;
  }

  isValidEmail(field: string): boolean {
    const formControl = this.form.get(field);
    return formControl?.errors?.email && formControl?.touched; 
  }

  isMaxLengthExceeded(field: string): boolean {
    const formControl = this.form.get(field);
    return formControl?.errors?.maxlength && formControl?.touched; 
  }

  isMinLengthInvalid(field: string): boolean {
    const formControl = this.form.get(field);
    return formControl?.errors?.minlength && formControl?.touched; 
  }

  isPatternValid(field: string): boolean{
    const formControl = this.form.get(field);
    return formControl?.errors?.pattern && formControl?.touched;
  }

  private loadRoles(): void {
    this.roleService.readRoles().subscribe(
      response => {
        response.data.forEach((role: Role) => {
          if (role.description === 'admin') {
            this.roles.push(role);
          }
        });
      },
      err => {
        this.dialogRef.close();
      }
    )
  }
}
