import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api =
    'http://localhost:8080/auth';

  constructor(
    private http: HttpClient
  ) {}

  login(email: string, password: string): Observable<any> {
  return this.http.post(
      `${this.api}/login`,
      {
        email: email,
        password: password
      },
      {
        responseType: 'text' as const
      }
    );
}

  register(
    user: any
  ): Observable<any> {

    return this.http.post<any>(
      `${this.api}/register`,
      user
    );

  }

  forgotPassword(
    email: string
  ): Observable<any> {

    return this.http.post<any>(
      `${this.api}/forgot-password`,
      {
        email
      }
    );

  }

}