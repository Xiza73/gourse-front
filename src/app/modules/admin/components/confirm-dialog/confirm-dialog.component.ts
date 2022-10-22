import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  title: string = '';
  message: string = '';
  confirmBtnLabel: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
  ) { }

  ngOnInit(): void {
    this.title = this.defaults.title;
    this.message = this.defaults.message;
    this.confirmBtnLabel = this.defaults.confirmBtnLabel;
  }

  confirm() {
    this.dialogRef.close('confirm');
  }
}
