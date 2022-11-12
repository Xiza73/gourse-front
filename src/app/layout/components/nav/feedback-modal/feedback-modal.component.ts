import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from 'src/app/data/services/client.service';

@Component({
  selector: 'app-feedback-modal',
  templateUrl: './feedback-modal.component.html',
  styleUrls: ['./feedback-modal.component.scss'],
})
export class FeedbackModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<FeedbackModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly clientService: ClientService,
    private readonly toastr: ToastrService
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

  ngOnInit(): void {}
}
