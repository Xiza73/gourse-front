import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { CourseService } from 'src/app/data/services/course.service';
import { switchMap, tap } from 'rxjs/operators';
import { InstitutionService } from 'src/app/data/services/institution.service';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from 'src/app/data/services/client.service';
import { Client } from 'src/app/data/types/client';
import { TokenService } from 'src/app/core/services/token.service';
import { of } from 'rxjs';


@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {
  // Icons
  faHeart = faHeart;
  active = false;

  courseId: string = '';
  course: any = {};
  institution: any = {};
  user: Client = {};

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private institutionService: InstitutionService,
    private clientService: ClientService,
    private tokenService: TokenService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const userId = this.tokenService.getClientIdFromToken();

    this.courseId = this.route.snapshot.params['id'];
    this.courseService.readCourse(this.courseId)
      .pipe(
        tap(response => this.course = response.data),
        switchMap(response => this.institutionService.readInsitution(response.data.institution)),
        tap(response => this.institution = response.data),
        switchMap(() => {
          if (!userId) {
            return of('unauthenticated');
          }
          return this.clientService.readClient(userId);
        })
      )
      .subscribe(
        response => {
          if (response !== 'unauthenticated') {
            this.user = response.data;
            this.user.favorites?.forEach(courseUrl => {
              if (courseUrl === this.course.url) {
                this.active = true;
              }
            });
          }
        },
        err => {
          this.toastr.error(err.error.message, 'Error');
          this.router.navigate(['/cursos/busqueda']);
        }
      );
  }

  public addDeleteFavorite(): void {
    if (!this.tokenService.isLogged()) {
      this.toastr.info('Inicia sesión para agregar a favoritos', 'Favoritos');
      return;
    }

    this.active = !this.active

    if (this.active) {
      this.clientService.addFavorite(this.user._id!, this.course.url).subscribe(
        response => {
          if (response.statusCode === 200) {
            this.toastr.success('Curso agregado a favoritos', 'Favoritos');
          }
        }
      );
    } else {
      this.clientService.removeFavorite(this.user._id!, this.course.url).subscribe(
        response => {
          if (response.statusCode === 200) {
            this.toastr.success('Curso eliminado de favoritos', 'Favoritos');
          }
        }
      );
    }
  }

}
