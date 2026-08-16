import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../services/booking';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './my-bookings.html',
  styleUrl: './my-bookings.css'
})
export class MyBookings implements OnInit {

  bookings: any[] = [];

  loading = true;

  errorMessage = '';

  userEmail = '';

  constructor(
    private bookingService: BookingService
  ) {}

 ngOnInit(): void {

  const userData =
    localStorage.getItem('user');

  console.log(
    'User data:',
    userData
  );

  if (!userData) {

    this.errorMessage =
      'User information not found';

    this.loading = false;

    return;

  }

  const user =
    JSON.parse(userData);

  this.userEmail =
    user.email;

  console.log(
    'Customer email:',
    this.userEmail
  );

  this.loadBookings();

}

 loadBookings(): void {

  console.log(
    'Calling API for:',
    this.userEmail
  );

  this.bookingService
    .getCustomerBookings(
      this.userEmail
    )
    .subscribe({

      next: (data: any[]) => {

        console.log(
          'Booking API response:',
          data
        );

        this.bookings = data;

        this.loading = false;

      },

      error: (error: any) => {

        console.error(
          'Booking API error:',
          error
        );

        this.errorMessage =
          'Failed to load your bookings';

        this.loading = false;

      }

    });

}

}