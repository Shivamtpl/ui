import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../services/booking';


@Component({
  selector: 'app-owner-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './owner-bookings.html',
  styleUrl: './owner-bookings.css'
})
export class OwnerBookings implements OnInit {

  bookings: any[] = [];
  userEmail = '';
  loading = true;

  constructor(
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {

    const userData =
      localStorage.getItem('user');

    if (!userData) {
      return;
    }

    const user =
      JSON.parse(userData);

    this.userEmail = user.email;

    this.loadBookings();

  }

  loadBookings(): void {

    this.bookingService
      .getOwnerBookings(this.userEmail)
      .subscribe({

        next: (data: any[]) => {

          this.bookings = data;
          this.loading = false;

        },

        error: (error: any) => {

          console.error(
            'Failed to load bookings:',
            error
          );

          this.loading = false;

        }

      });

  }
approveBooking(id: number): void {

  this.bookingService
    .approveBooking(id)
    .subscribe({

      next: (data: any) => {

        console.log(
          'Booking approved:',
          data
        );

        this.updateBookingStatus(
          id,
          'APPROVED'
        );

      },

      error: (error: any) => {

        console.error(
          'Approve failed:',
          error
        );

      }

    });

}
rejectBooking(id: number): void {

  this.bookingService
    .rejectBooking(id)
    .subscribe({

      next: (data: any) => {

        console.log(
          'Booking rejected:',
          data
        );

        this.updateBookingStatus(
          id,
          'REJECTED'
        );

      },

      error: (error: any) => {

        console.error(
          'Reject failed:',
          error
        );

      }

    });

}
updateBookingStatus(
  id: number,
  status: string
): void {

  const booking =
    this.bookings.find(
      booking => booking.id === id
    );

  if (booking) {

    booking.status = status;

  }

}
}