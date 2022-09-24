import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-box',
  templateUrl: './course-box.component.html',
  styleUrls: ['./course-box.component.scss']
})
export class CourseBoxComponent implements OnInit {
  @Input() course: any;

  constructor() { }

  ngOnInit(): void {
  }

}
