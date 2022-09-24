import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenService } from 'src/app/core/services/token.service';
import { ClientService } from 'src/app/data/services/client.service';
import { Router } from '@angular/router';
import { DataSharingService } from 'src/app/core/services/data-sharing.service';
import { UserService } from 'src/app/data/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  isLogged: boolean = false;
  username: string = '';
  aboutMe: string = '';
  id: string | null = '';

  form = new FormGroup({
    email: new FormControl({ disabled: true }, [
      Validators.required,
      Validators.email,
      Validators.maxLength(50),
    ]),
    username: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
      Validators.pattern("[A-Za-z0-9]+")
    ]),
    aboutMe: new FormControl('', [
      Validators.maxLength(240)
    ]),
  });

  pwdForm = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ])
  });

  constructor(
    private tokenService: TokenService,
    private toastr: ToastrService,
    private clientService: ClientService,
    private userService: UserService,
    private dataSharingService: DataSharingService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.id = this.tokenService.getIdFromToken();
    if (!this.id) {
      this.toastr.error('Error al encontrar usuario', 'Error');
      return;
    }
    this.clientService.getUserProfile(this.id).subscribe(
      (res) => {
        const { email, username, aboutMe } = res.body.data;
        if (aboutMe) {
          this.form.setValue({ email, username, aboutMe });
        } else {
          this.form.setValue({ email, username, aboutMe: ""});
        }
        
        this.username = username;
        this.aboutMe = aboutMe;
      },
      (err) => {
        this.toastr.error(err.error.message, 'Error');
      }
    );
  }

  public saveData() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const body = {
      username: this.form.value.username,
      aboutMe: this.form.value.aboutMe
    };

    if (this.username === body.username && this.aboutMe === body.aboutMe) {
      this.toastr.info('No hay datos que actualizar', 'Perfil')
      return;
    }

    this.clientService.updateUserProfile(this.id!, body).subscribe(
      (res) => {
        this.toastr.success(res.message, 'Éxito');
        this.dataSharingService.username.next(body.username);
        this.getData();
      },
      (err) => {
        this.toastr.error(err.error.message, 'Error');
      }
    );
  }

  public updatePassword() {
    if (this.pwdForm.invalid) {
      this.pwdForm.markAllAsTouched();
      return;
    }

    const body = {
      id: this.id,
      password: this.pwdForm.value.password,
      newPassword: this.pwdForm.value.newPassword
    };

    this.userService.updatePassword(body).subscribe(
      (res) => {
        this.toastr.success(res.message, 'Éxito');
      },
      (err) => {
        this.toastr.error(err.error.message, 'Error');
      }
    ).add(() => {
      this.pwdForm.reset();
    });
  }

  isRequiredField(field: string, form: FormGroup): boolean {
    const formControl = form.get(field);
    return formControl?.errors?.required && formControl?.touched;
  }

  isMaxLengthExceeded(field: string, form: FormGroup): boolean {
    const formControl = form.get(field);
    return formControl?.errors?.maxlength && formControl?.touched; 
  }

  isMinLengthInvalid(field: string, form: FormGroup): boolean {
    const formControl = form.get(field);
    return formControl?.errors?.minlength && formControl?.touched;
  }

  isPatternValid(field: string, form: FormGroup): boolean{
    const formControl = form.get(field);
    return formControl?.errors?.pattern && formControl?.touched;
  }
}
