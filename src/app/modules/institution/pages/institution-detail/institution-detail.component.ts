import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import {
  faFrown,
  faMeh,
  faShareSquare,
  faSmile,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { switchMap, tap } from 'rxjs/operators';
import { CourseService } from 'src/app/data/services/course.service';
import { InstitutionService } from 'src/app/data/services/institution.service';

import SwiperCore, { Pagination, Navigation, SwiperOptions } from 'swiper';
import { TokenService } from '../../../../core/services/token.service';
import { MatDialog } from '@angular/material/dialog';
import { FeedbackModalComponent } from './feedback-modal/feedback-modal.component';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { CommentService } from '../../../../data/services/comment.service';

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
  faTwitter = faTwitter;
  faInstagram = faInstagram;
  faStar = faStar;
  faShare = faShareSquare;
  faSmile = faSmile;
  faMeh = faMeh;
  faFrown = faFrown;

  institutionId: string = '';
  institution: any = {};
  courses: any[] = [];
  stars: boolean[] = [];
  ratings: {
    user: string;
    stars: boolean[];
    comment: string;
  }[] = [];

  config: SwiperOptions = {
    slidesPerView: 5,
    spaceBetween: 20,
    slidesPerGroup: 1,
    loop: true,
    loopFillGroupWithBlank: true,
    navigation: true,
  };

  newComment: string = '';
  comments: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private institutionService: InstitutionService,
    private courseService: CourseService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    public feedbackModal: MatDialog,
    private router: Router,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.institutionId = this.route.snapshot.params['id'];
    this.institutionService
      .readInsitution(this.institutionId)
      .pipe(
        tap((response) => (this.institution = response.data)),
        switchMap(() =>
          this.courseService.readCoursesByInstitutionId(this.institutionId)
        )
      )
      .subscribe(
        (response) => {
          this.courses = response.data;
        },
        (err) => {
          this.toastr.error(err.error.message, 'Error');
          this.router.navigate(['/institutiones/busqueda']);
        }
      );

    this.getComments();
    this.getInstitutionsRating();
  }

  public getInstitutionsRating(): any {
    this.institutionService.getInstitutionRating(this.institutionId).subscribe(
      (response) => {
        this.institution.rating = response.data.averageScore;
        // this.ratings = response.data.comments;
        this.ratings = response.data.comments.map((comment: any) => {
          const stars = new Array(5).fill(false);
          for (let i = 0; i < comment.score; i++) {
            stars[i] = true;
          }

          return {
            user: comment.user,
            stars,
            comment: comment.comment,
          };
        });

        this.stars = new Array(5).fill(false);
        for (let i = 0; i < this.institution.rating; i++) {
          this.stars[i] = true;
        }
      },
      (err) => {
        this.toastr.error(err.error.message, 'Error');
      }
    );
  }

  public openRatingModal(): void {
    if (!this.tokenService.isLogged()) {
      this.toastr.info('Inicia sesión para calificar', 'Calificar');
      return;
    }

    const idUser = this.tokenService.getIdFromToken()!;

    const dialogRef = this.feedbackModal.open(FeedbackModalComponent, {
      width: '450px',
      data: {
        idUser,
        idInstitution: this.institutionId,
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getInstitutionsRating();
    });
  }

  public getRating(): string {
    return this.institution?.rating?.toFixed(1);
  }

  public getRatingCount(stars: boolean[]): string {
    return stars.filter((star) => star).length.toFixed(1);
  }

  public getRatingFace(stars: boolean[]): IconProp {
    const rating = stars.filter((star) => star).length;
    if (rating <= 1) {
      return faFrown;
    } else if (rating <= 3) {
      return faMeh;
    } else {
      return faSmile;
    }
  }

  public getComments(): void {
    this.commentService.getComments(this.institutionId).subscribe(
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
        idEntity: this.institutionId,
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
