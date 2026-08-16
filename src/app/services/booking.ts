import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private api = 'http://localhost:8080/bookings';

  constructor(private http: HttpClient) {}

  createBooking(booking: any): Observable<any> {
    return this.http.post<any>(this.api, booking);
  }

  getMyBookings(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }
getOwnerBookings(
  email: string
): Observable<any[]> {

  return this.http.get<any[]>(
    `http://localhost:8080/bookings/owner/${email}`
  );
}
approveBooking(
  id: number
): Observable<any> {

  return this.http.put(
    `http://localhost:8080/booking/${id}/approve`,
    {}
  );

}

rejectBooking(
  id: number
): Observable<any> {

  return this.http.put(
    `http://localhost:8080/booking/${id}/reject`,
    {}
  );

}
getCustomerBookings(
  email: string
): Observable<any[]> {

  return this.http.get<any[]>(
    `http://localhost:8080/booking/customer/${email}`
  );

}
}