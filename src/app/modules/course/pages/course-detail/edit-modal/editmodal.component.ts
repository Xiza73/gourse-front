import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from 'src/app/data/services/course.service';

@Component({
  selector: 'app-editmodal',
  templateUrl: './editmodal.component.html',
  styleUrls: ['./editmodal.component.scss']
})
export class EditmodalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditmodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly courseService: CourseService,
    private readonly toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  editMessage(){
    
  }

}
