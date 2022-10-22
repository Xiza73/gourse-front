import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl: string = environment.apiUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  public readRole(id: string): Observable<any> {
    return this.httpClient.get(this.apiUrl + `/role/${id}`);
  }

  public readRoles(): Observable<any> {
    return this.httpClient.get(this.apiUrl + '/role');
  }
}
