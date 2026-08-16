import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DashboardResponse {

  totalUsers: number;
  totalRooms: number;
  totalBookings: number;
  totalFavorites: number;

}

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private api = 'http://localhost:8080/admin';

  constructor(private http: HttpClient) {}

  getDashboard(): Observable<DashboardResponse> {

    return this.http.get<DashboardResponse>(
      `${this.api}/dashboard`
    );

  }

}