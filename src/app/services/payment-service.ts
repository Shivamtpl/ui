import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private api = 'http://localhost:8080/payments';

  constructor(private http: HttpClient) {}

  savePayment(payment: any) {
    return this.http.post(this.api, payment);
  }

}