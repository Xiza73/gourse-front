import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {faFacebook} from '@fortawesome/free-brands-svg-icons';
import {faTwitter} from '@fortawesome/free-brands-svg-icons';
import {faInstagram} from '@fortawesome/free-brands-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { switchMap, tap } from 'rxjs/operators';
import { CourseService } from 'src/app/data/services/course.service';
import { InstitutionService } from 'src/app/data/services/institution.service';

import SwiperCore, { Pagination, Navigation, SwiperOptions } from 'swiper';


// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

@Component({
  selector: 'app-institution-detail',
  templateUrl: './institution-detail.component.html',
  styleUrls: ['./institution-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InstitutionDetailComponent implements OnInit {

  faFacebook = faFacebook;
  faTwitter= faTwitter;
  faInstagram = faInstagram;

  institutionId: string = '';
  institution: any = {};
  courses: any[] = [];
  
  config: SwiperOptions = {
    slidesPerView: 5,
    spaceBetween: 20,
    slidesPerGroup: 1,
    loop: true,
    loopFillGroupWithBlank: true,
    navigation: true
  };

  constructor(
    private route: ActivatedRoute,
    private institutionService: InstitutionService,
    private courseService: CourseService,
    private toastr: ToastrService,
    private router: Router 
  ) { }

  ngOnInit(): void {
    this.institutionId = this.route.snapshot.params['id'];
    this.institutionService.readInsitution(this.institutionId)
      .pipe(
        tap(response => this.institution = response.data),
        switchMap(() => this.courseService.readCoursesByInstitutionId(this.institutionId))
      )
      .subscribe(
        response => {
          this.courses = response.data;
        },
        err => {
          this.toastr.error(err.error.message, 'Error');
          this.router.navigate(['/institutiones/busqueda']);
        }
      );
  }

}
