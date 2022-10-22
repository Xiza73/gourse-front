import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Institution } from '../types/institution';

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {
  private apiUrl: string = environment.apiUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  public readInstitutions(name: string = ''): Observable<any> {
    const params = new HttpParams()
      .set('name', name);

    return this.httpClient.get(this.apiUrl + '/institution', {params});
  }

  public readAllInstitutions(name: string = ''): Observable<any> {
    const params = new HttpParams()
      .set('name', name);

    return this.httpClient.get(this.apiUrl + '/institution/all', {params});
  }
  
  public readInsitution(id: string): Observable<any> {
    return this.httpClient.get(this.apiUrl + `/institution/${id}`);
  }

  public createInstitution(institution: Institution): Observable<any> {
    return this.httpClient.post(this.apiUrl + '/institution', institution);
  }

  public updateInstitution(institution: Institution): Observable<any> {
    return this.httpClient.put(this.apiUrl + '/institution', institution);
  }

  public deleteInstitution(id: string): Observable<any> {
    return this.httpClient.delete(this.apiUrl + `/institution/${id}`);
  }
}
