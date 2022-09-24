import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faThemeisle } from '@fortawesome/free-brands-svg-icons';
import { faChevronLeft, faChevronRight, faUniversity } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SearchService } from 'src/app/core/services/search.service';

@Component({
  selector: 'app-institution-search',
  templateUrl: './institution-search.component.html',
  styleUrls: ['./institution-search.component.scss']
})
export class InstitutionSearchComponent implements OnInit {
  faInstitution = faUniversity;
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;

  total = -1;
  institutions: any[] = [];
  
  // Form
  form: FormGroup = this.fb.group({
    name: ['']
  });

  // Pagination
  institutionsToShow: any[] = [];
  pageSize: number = 12;
  currentPage: number = 1;
  numberPages: number = 0;
  
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    const name = this.route.snapshot.queryParams.name || '';

    this.form.setValue({
      name
    });

    this.searchInstitutions();
  }

  search(): void {
    this.router.navigate(['/instituciones/busqueda'], {queryParams: {
      'name': this.form.value.name
    }});

    this.searchInstitutions();
  }

  nextPage(): void {
    const index = this.currentPage * this.pageSize;
    this.currentPage += 1;
    this.institutionsToShow = this.institutions.slice(index, index + this.pageSize);
  }

  previousPage(): void {
    const index = (this.currentPage - 1) * this.pageSize;
    this.currentPage -= 1;
    this.institutionsToShow = this.institutions.slice(index - this.pageSize, index);
  }

  showNextPageBtn(): boolean {
    return this.currentPage !== this.numberPages;
  }

  showPreviousPageBtn(): boolean {
    return this.currentPage !== 1;
  }

  private searchInstitutions(): void {
    this.total = -1;
    this.spinner.show();

    this.searchService.searchInstitutions(this.form.value.name)
      .subscribe(
        response => {
          this.institutions = response.data;
          this.total = this.institutions.length;

          this.numberPages = Math.ceil(this.total / this.pageSize);
          this.institutionsToShow = this.institutions.slice(0, this.pageSize);
        },
        err => {
          this.toastr.error(err.error.message, 'Error');
          this.total = 0;
        },
      )
      .add(() => this.spinner.hide());
  }

}

