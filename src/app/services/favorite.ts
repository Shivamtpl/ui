import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private api = 'http://localhost:8080/favorites';

  constructor(private http: HttpClient) {}

  addFavorite(
    userEmail: string,
    roomId: number
  ): Observable<any> {

    return this.http.post<any>(
      this.api,
      {
        userEmail: userEmail,

        room: {
          id: roomId
        }
      }
    );

  }

  getFavorites(
    email: string
  ): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.api}/${email}`
    );

  }

}