import { Component, Input, OnInit } from '@angular/core';
import { Course } from 'src/app/data/types/course';

@Component({
  selector: 'app-course-search-item',
  templateUrl: './course-search-item.component.html',
  styleUrls: ['./course-search-item.component.scss']
})
export class CourseSearchItemComponent implements OnInit {
  @Input() course: any = {};

  constructor() { }

  ngOnInit(): void {
  }

}
