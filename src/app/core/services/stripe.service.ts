import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  constructor(private http: HttpClient) {}

  generatePaymentMethod(token: string, user: string): Promise<any> {
    return this.http
      .post(`${environment.apiUrl}/stripe/generatePaymentMethod`, {
        token,
        user,
      })
      .toPromise();
  }

  confirmPremium(id: string): Promise<any> {
    return this.http
      .post(`${environment.apiUrl}/stripe/confirmPremium`, {
        id,
      })
      .toPromise();
  }
}
