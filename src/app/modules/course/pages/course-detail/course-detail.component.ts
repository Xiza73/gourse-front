import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faHeart,
  faCheck,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
import { CourseService } from 'src/app/data/services/course.service';
import { switchMap, tap } from 'rxjs/operators';
import { InstitutionService } from 'src/app/data/services/institution.service';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from 'src/app/data/services/client.service';
import { Client } from 'src/app/data/types/client';
import { TokenService } from 'src/app/core/services/token.service';
import { of } from 'rxjs';
import { CommentService } from '../../../../data/services/comment.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss'],
})
export class CourseDetailComponent implements OnInit {
  // Icons
  faHeart = faHeart;
  faCheck = faCheckCircle;
  activeHeart = false;
  activeCheck = false;

  courseId: string = '';
  course: any = {};
  institution: any = {};
  user: Client = {};

  newComment: string = '';
  comments: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private institutionService: InstitutionService,
    private clientService: ClientService,
    private commentService: CommentService,
    private tokenService: TokenService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.tokenService.getClientIdFromToken();

    this.courseId = this.route.snapshot.params['id'];
    this.courseService
      .readCourse(this.courseId)
      .pipe(
        tap((response) => (this.course = response.data)),
        switchMap((response) =>
          this.institutionService.readInsitution(response.data.institution)
        ),
        tap((response) => (this.institution = response.data)),
        switchMap(() => {
          if (!userId) {
            return of('unauthenticated');
          }
          return this.clientService.readClient(userId);
        })
      )
      .subscribe(
        (response) => {
          if (response !== 'unauthenticated') {
            this.user = response.data;
            this.user.favorites?.forEach((courseUrl) => {
              if (courseUrl === this.course.url) {
                this.activeHeart = true;
              }
            });
            this.user.complete?.forEach((courseUrl) => {
              if (courseUrl === this.course.url) {
                this.activeCheck = true;
              }
            });
          }
        },
        (err) => {
          this.toastr.error(err.error.message, 'Error');
          this.router.navigate(['/cursos/busqueda']);
        }
      );

    this.getComments();
  }

  public addDeleteFavorite(): void {
    if (!this.tokenService.isLogged()) {
      this.toastr.info('Inicia sesión para agregar a favoritos', 'Favoritos');
      return;
    }

    this.activeHeart = !this.activeHeart;

    if (this.activeHeart) {
      this.clientService
        .addFavorite(this.user._id!, this.course.url)
        .subscribe((response) => {
          if (response.statusCode === 200) {
            this.toastr.success('Curso agregado a favoritos', 'Favoritos');
          }
        });
    } else {
      this.clientService
        .removeFavorite(this.user._id!, this.course.url)
        .subscribe((response) => {
          if (response.statusCode === 200) {
            this.toastr.success('Curso eliminado de favoritos', 'Favoritos');
          }
        });
    }
  }

  public addDeleteCheck(): void {
    if (!this.tokenService.isLogged()) {
      this.toastr.info(
        'Inicia sesión para usar completar el curso',
        'Completar'
      );
      return;
    }

    this.activeCheck = !this.activeCheck;

    if (this.activeCheck) {
      this.clientService
        .addCompleted(this.user._id!, this.course.url)
        .subscribe(
          (response) => {
            if (response.statusCode === 200) {
              this.toastr.success(
                'Curso marcado como completado',
                'Completado'
              );
            }
          },
          (err) => {
            this.toastr.error(err.error.message, 'Error');
            this.activeCheck = false;
          }
        );
    } else {
      this.clientService
        .removeCompleted(this.user._id!, this.course.url)
        .subscribe((response) => {
          if (response.statusCode === 200) {
            this.toastr.success(
              'Curso desmarcado como completado',
              'Completado'
            );
          }
        });
    }
  }

  public getComments(): void {
    this.commentService.getComments(this.courseId).subscribe(
      (response) => {
        this.comments = response.data;
        if (this.comments.length === 0) {
          this.toastr.info('No hay comentarios para este curso', 'Comentarios');
        }
      },
      (err) => {
        this.toastr.error(err.error.message, 'Error');
      }
    );
  }

  addComment(): void {
    if (!this.tokenService.isLogged()) {
      this.toastr.info('Inicia sesión para comentar', 'Comentar');
      return;
    }

    if (this.newComment === '') {
      this.toastr.info('Debes escribir un comentario', 'Comentar');
      return;
    }

    this.commentService
      .addComment({
        comment: this.newComment,
        idEntity: this.courseId,
        idUser: this.tokenService.getIdFromToken()!,
      })
      .subscribe((response) => {
        if (response.statusCode === 200) {
          this.newComment = '';
          this.getComments();
        }
      });
  }
}
