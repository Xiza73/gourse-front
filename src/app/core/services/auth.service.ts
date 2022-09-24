import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from 'src/app/data/types/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  public login(user: User): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + '/signin', user);
  }

  public singup(user: User): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + '/signup', user);
  }

  public logout(): void {}

  //Recover password
  public isUser(id: string): Observable<any> {
    return this.httpClient.post<any>(
      this.apiUrl + '/isuser',
      { id },
      { observe: 'body' }
    );
  }

  public resetPassword(id: string, password: string): Observable<any> {
    return this.httpClient.post<any>(
      this.apiUrl + '/reset',
      { id, password },
      { observe: 'body' }
    );
  }

  public sendRecoverEmail(email: string): Observable<any> {
    return this.httpClient.post<any>(
      this.apiUrl + '/recover',
      { email },
      { observe: 'body' }
    );
  }
}
