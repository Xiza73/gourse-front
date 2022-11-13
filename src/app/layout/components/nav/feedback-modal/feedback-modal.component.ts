import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/core/services/token.service';
import { ClientService } from 'src/app/data/services/client.service';

@Component({
  selector: 'app-feedback-modal',
  templateUrl: './feedback-modal.component.html',
  styleUrls: ['./feedback-modal.component.scss'],
})
export class FeedbackModalComponent implements OnInit {
  isLogged: boolean = false;
  id: string | null = '';
  
  constructor(
    public dialogRef: MatDialogRef<FeedbackModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly clientService: ClientService,
    private readonly toastr: ToastrService,
    private tokenService: TokenService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  sendMessage(): void {
    this.clientService.sendFeedbackMessage(this.data).subscribe(
      (response) => {
        this.toastr.success(response.message);
      },
      (error) => {
        this.toastr.error(error.error.message);
      },
      () => {
        this.dialogRef.close();
      }
    );
    console.log('no fin');
  }

  ngOnInit(): void {
    this.getData();
    this.fieldsValidate();
  }

  getData(): void {
    this.id = this.tokenService.getIdFromToken();
    if (!this.id) {
      this.isLogged = false;
      return;
    }
    this.clientService.getUserProfile(this.id).subscribe(
      (res) => {
        const { email, username } = res.body.data;
        this.data.email = email;
        this.data.name = username;
        this.isLogged = true;
      },
      (err) => {
        this.toastr.error(err.error.message, 'Error al cargar la información');
        this.dialogRef.close();
      }
    );
  }

  fieldsValidate(): boolean {
    if (this.data.name == '' || this.data.name == null) {
      return false;
    } else if (
      this.data.email == '' ||
      this.data.email == null ||
      !this.isValidEmail()
    ) {
      return false;
    } else if (this.data.message == '' || this.data.message == null) {
      return false;
    } else {
      return true;
    }
  }

  isValidEmail(): boolean {
    const re = /\S+@\S+\.\S+/;
    return re.test(this.data.email);
  }

  isRequiredField(field: string): boolean {
    return this.data[field] == '' || this.data[field] == null;
  }
}
