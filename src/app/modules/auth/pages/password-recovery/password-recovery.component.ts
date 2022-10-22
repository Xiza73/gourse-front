import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss'],
})
export class PasswordRecoveryComponent implements OnInit {
  faEnvelope = faEnvelope;

  @ViewChild('submitButton') submitButton!: ElementRef<HTMLButtonElement>;

  form: FormGroup = this.fb.group({
    email: [
      '',
      [Validators.required, Validators.email, Validators.maxLength(50)],
    ],
  });
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  public sendRecoveryEmail() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email } = this.form.value;
    this.submitButton.nativeElement.disabled = true;
    this.spinner.show();
    this.authService.sendRecoverEmail(email)
      .subscribe(
        (res) => {
          if (res.statusCode === 200) {
            this.toastr.success('Por favor revise su bandeja de entrada.', 'Correo enviado', {
              timeOut: 8000
            });
            this.router.navigate(['/login']);
          }
        },
        (err) => {
          this.toastr.error(err.error.message, 'Error');
        }
      )
      .add(() => {
        this.submitButton.nativeElement.disabled = false;
        this.spinner.hide();
      });
  }

  isValidEmail(): boolean {
    const formControl = this.form.get('email');
    return formControl?.errors?.email && formControl?.touched;
  }

  isRequiredField(field: string): boolean {
    const formControl = this.form.get(field);
    return formControl?.errors?.required && formControl?.touched;
  }
}
