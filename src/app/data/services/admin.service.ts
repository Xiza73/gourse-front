import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl: string = environment.apiUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  public getUserProfile(id: string): Observable<any> {
    let params: HttpParams = new HttpParams();
    if (id) {
      params = params.append('id', id);
    }
    return this.httpClient.get(this.apiUrl + '/admin/profile/id', { observe: "response", params });
  }

  public createUser(user: User): Observable<any> {
    return this.httpClient.post(this.apiUrl + '/admin', user);
  }

  public updateUser(user: User): Observable<any> {
    return this.httpClient.put(this.apiUrl + '/admin', user);
  }

  public deleteUser(id: string): Observable<any> {
    return this.httpClient.delete(this.apiUrl + `/admin/${id}`);
  }
}
