import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl: string = environment.apiUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  public readUsers(person: string): Observable<any> {
    const params = new HttpParams()
      .set('person', person);

    return this.httpClient.get(this.apiUrl + '/user/', {params});
  }

  public deleteUser(id: string): Observable<any> {
    return this.httpClient.delete(this.apiUrl + `/user/${id}`);
  }

  public updatePassword(body: any): Observable<any> {
    return this.httpClient.put(this.apiUrl + '/user/password', body)
  }
}
