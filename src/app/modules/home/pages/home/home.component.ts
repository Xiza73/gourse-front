import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from 'src/app/data/services/course.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  faBook = faBook;
  courses: any[] = [];

  // Form
  form: FormGroup = this.fb.group({
    name: ['']
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private courseService: CourseService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    console.log('apiUrl', environment.apiUrl);
    this.spinner.show();
    this.courseService.readCourses('', 'start', '-1')
      .subscribe(
        response => {
          this.courses = response.data;
          this.courses = response.data.slice(0, 4);
        },
        err => {
          this.toastr.error(err.error.message, 'Error');
        }
      )
      .add(() => this.spinner.hide());
  }

  findCourse(): void {
    const { name } = this.form.value;

    this.router.navigate(['cursos/busqueda'], {queryParams: {
      'course': name,
      'option': 1
    }});
  }
}


