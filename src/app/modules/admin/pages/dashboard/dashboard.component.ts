import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/core/services/search.service';
import { ClientService } from 'src/app/data/services/client.service';
import { InstitutionService } from 'src/app/data/services/institution.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  numClients: number = 0;
  numCourses: number = 0;
  numInstitutions: number = 0;

  constructor(
    private clientService: ClientService,
    private searchService: SearchService,
    private institutionService: InstitutionService
  ) { }

  ngOnInit(): void {
    this.searchService.searchCourses().subscribe(
      response => this.numCourses = response.data.length
    );
    this.institutionService.readInstitutions().subscribe(
      response => this.numInstitutions = response.data.length
    );
    this.clientService.readClients().subscribe(
      response => this.numClients = response.data.length
    );
  }

}
