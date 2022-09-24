import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/data/types/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  faUser = faUser;
  faEnvelope = faEnvelope;
  faLock = faLock;
  
  // Form
  form: FormGroup = this.fb.group({
    username: ['', [ Validators.required, Validators.maxLength(50), Validators.pattern("[A-Za-z0-9]+")]],
    email   : ['', [ Validators.required, Validators.email, Validators.maxLength(50) ]],
    password: ['', [ Validators.required, Validators.minLength(3) ]]
  });

  @ViewChild('submitButton') submitButton!: ElementRef<HTMLButtonElement>;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) { }
  
  ngOnInit(): void {
  }

  signup(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const user: User = this.form.value;

    this.submitButton.nativeElement.disabled = true;
    this.authService.singup(user)
      .subscribe(
        response => {
          if (response.statusCode) {
            this.toastr.success('Inicie sesión', 'Registro exitoso');
          }
          this.router.navigate(['/login']);
        },
        err => {
          this.toastr.error(err.error.message, 'Error');
          this.submitButton.nativeElement.disabled = false;
        }
      )
      .add(() => {
        this.submitButton.nativeElement.disabled = false;
      });
  }

  isRequiredField(field: string): boolean {
    const formControl = this.form.get(field);
    return formControl?.errors?.required && formControl?.touched;
  }

  isPatternValid(field: string): boolean{
    const formControl = this.form.get(field);
    return formControl?.errors?.pattern && formControl?.touched;
  }

  isValidEmail(): boolean {
    const formControl = this.form.get('email');
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

}
