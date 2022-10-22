import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { switchMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { DataSharingService } from 'src/app/core/services/data-sharing.service';
import { TokenService } from 'src/app/core/services/token.service';
import { AdminService } from 'src/app/data/services/admin.service';
import { ClientService } from 'src/app/data/services/client.service';
import { RoleService } from 'src/app/data/services/role.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // Icons
  faUser = faUser;
  faEnvelope = faEnvelope;
  faLock = faLock;
  
  // Form
  form: FormGroup = this.fb.group({
    email   : ['', [ Validators.required, Validators.email, Validators.maxLength(50) ]],
    password: ['', [ Validators.required, Validators.minLength(3) ]]
  });

  role: string = '';

  @ViewChild('submitButton') submitButton!: ElementRef<HTMLButtonElement>;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private tokenService: TokenService,
    private router: Router,
    private toastr: ToastrService,
    private dataSharingService: DataSharingService,
    private clientService: ClientService,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {

  }

  login(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const user: any = this.form.value;

    this.submitButton.nativeElement.disabled = true;
    this.authService.login(user)
      .pipe(
        tap(response => {
          this.tokenService.removeToken();
          this.tokenService.setToken(response.token);
        }),
        switchMap(() => {
          this.role = this.tokenService.getRoleFromToken()!;
          const id = this.tokenService.getIdFromToken()!;
          if (this.role === 'client') {
            return this.clientService.getUserProfile(id);
          }
          return this.adminService.getUserProfile(id);
        })
      )
      .subscribe(
        response => {
          const { username } = response.body.data
          this.dataSharingService.username.next(username);

          if (this.role === 'client') {
            this.router.navigate(['/']);
          } else {
            this.router.navigate(['/admin']);
          }
        },
        err => {
          this.toastr.error(err.error.message, 'Error');
          this.tokenService.removeToken();
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
