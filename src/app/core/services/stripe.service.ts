import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  constructor(
    private http: HttpClient,
    private _router: Router,
  ) { }

  generatePaymentMethod(token: string, user: string): Promise<any> {
    return this.http.post(`${environment.apiUrl}/stripe/generatePaymentMethod`,
      {
        token,
        user
      }).toPromise();
  }

  confirmPremium(id: string): Promise<any> {
    return this.http.post(`${environment.apiUrl}/stripe/confirmPremium`,
      {
        id
      }).toPromise();
  }


  // getPaymentDetail(id: string): Observable<any> {
  //   return this.http.get(`${environment.apiUrl}/StripeRouter/${id}`)
  // }


  // generatePaymentIntent(data: { name: string, amount: number }): Observable<any> {
  //   return this.http.post(`${environment.apiUrl}/StripeRouter`, data)
  // }

  // confirmPaymentIntent(id: string): Promise<any> {
  //   return this.http.post(`${environment.apiUrl}/StripeRouter${id}`, {}).toPromise()
  // }
}
