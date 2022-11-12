import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  public addComment({
    comment,
    idEntity,
    idUser,
  }: {
    comment: string;
    idEntity: string;
    idUser: string;
  }): Observable<any> {
    return this.httpClient.post(
      this.apiUrl + '/comment',
      {
        comment,
        idEntity,
        idUser,
      },
      { observe: 'body' }
    );
  }

  public getComments(idEntity: string): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/comment/${idEntity}`);
  }
}
