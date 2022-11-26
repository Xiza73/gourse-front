import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { InstitutionService } from '../../../../../data/services/institution.service';

@Component({
  selector: 'app-feedback-modal',
  templateUrl: './feedback-modal.component.html',
  styleUrls: ['./feedback-modal.component.scss'],
})
export class FeedbackModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<FeedbackModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly institutionService: InstitutionService,
    private readonly toastr: ToastrService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  sendMessage(): void {
    this.institutionService
      .sendScore(
        this.data.idUser,
        this.data.idInstitution,
        this.data.score,
        this.data.comment
      )
      .subscribe(
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
  }

  ngOnInit(): void {}
}
