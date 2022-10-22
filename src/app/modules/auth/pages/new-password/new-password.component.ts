import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { ValidationService } from 'src/app/core/services/validation.service';
@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss'],
})
export class NewPasswordComponent implements OnInit {
  faLock = faLock;
  public id: string = '';

  form: FormGroup = this.fb.group({
    password       : ['', [ Validators.required, Validators.minLength(3), Validators.maxLength(20) ]],
    confirmPassword: ['', [ Validators.required, Validators.minLength(3), Validators.maxLength(20) ]],
  }, {
    validators: [ this.validationService.mustMatch('password', 'confirmPassword') ]
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService,
    private validationService: ValidationService
  ) {}

  ngOnInit(): void {
    this.comprobarId();
  }

  comprobarId(): void {
    this.route.queryParams.subscribe((params) => {
      if (!params.id) {
        this.router.navigate(['/']);
        return;
      }
      this.id = params.id;
      this.authService.isUser(params.id).subscribe(
        (res) => {
          // this.toastr.success(res.message, `OK: ${res.statusCode}`);
        },
        (err) => {
          // this.toastr.error(
          //   err.error.message,
          //   `Error: ${err.error.statusCode}`
          // );
          this.router.navigate(['/']);
          return;
        }
      );
    });
  }

  resetPassword(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.authService.resetPassword(this.id, this.form.value.password).subscribe(
      (res) => {
        this.toastr.success(res.message, 'Éxito');
        this.router.navigate(['/login']);
      },
      (err) => {
        this.toastr.error(err.error.message, 'Error');
      }
    );
  }

  isRequiredField(field: string): boolean {
    const formControl = this.form.get(field);
    return formControl?.errors?.required && formControl?.touched;
  }

  isMinLengthInvalid(field: string): boolean {
    const formControl = this.form.get(field);
    return formControl?.errors?.minlength && formControl?.touched;
  }

  notMatchError(field: string): boolean {
    const formControl = this.form.get(field);
    return formControl?.errors?.notMatch && formControl?.touched;
  }
}
