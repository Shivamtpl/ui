import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Room } from '../../models/room';
import { BookingService } from '../../services/booking';
import { RoomService } from '../../services/room';
import { FavoriteService } from '../../services/favorite';

@Component({
  selector: 'app-room-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './room-details.html',
  styleUrl: './room-details.css'
})
export class RoomDetails implements OnInit {

  room!: Room;
  loading = true;

  isFavorite = false;
  favoriteMessage = '';

   userEmail = '';

  showBookingForm = false;
  bookingSuccess = '';
  bookingError = '';

  customerName = '';
  customerEmail = '';
  customerPhone = '';
  bookingDate = '';
  

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private bookingService: BookingService,
    private router: Router,
    private favoriteService: FavoriteService,

  ) { }

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.roomService.getRoomById(id).subscribe({

      next: (data) => {
        this.room = data;
        this.loading = false;
      },

      error: (error) => {
        console.error(error);
        this.loading = false;
      }

    });

    this.loadUserDetails();

    const userData = localStorage.getItem('user');

if (userData) {

  const user = JSON.parse(userData);

  this.userEmail = user.email;

}
  }

  loadUserDetails(): void {

    const userData = localStorage.getItem('user');

    if (userData) {

      const user = JSON.parse(userData);

      this.customerName = user.name || '';
      this.customerEmail = user.email || '';
      this.customerPhone = user.phone || '';

    }

  }

  openBookingForm(): void {

    this.bookingSuccess = '';
    this.bookingError = '';

    this.showBookingForm = true;

  }

  closeBookingForm(): void {
    this.showBookingForm = false;
  }

  confirmBooking(): void {

    this.bookingSuccess = '';
    this.bookingError = '';

    if (
      !this.customerName ||
      !this.customerEmail ||
      !this.customerPhone ||
      !this.bookingDate
    ) {

      this.bookingError =
        'Please fill all booking details';

      return;

    }

    const booking = {

      customerName: this.customerName,

      customerEmail: this.customerEmail,

      customerPhone: this.customerPhone,

      bookingDate: this.bookingDate,

      room: {
        id: this.room.id
      }

    };

    this.bookingService
      .createBooking(booking)
      .subscribe({

        next: (response) => {

          console.log('Booking successful:', response);

          this.bookingSuccess =
            'Booking request submitted successfully!';

          setTimeout(() => {

            this.showBookingForm = false;

            this.router.navigate(['/my-bookings']);

          }, 1500);

        },

        error: (error) => {

          console.error('Booking failed:', error);

          this.bookingError =
            'Booking failed. Please try again.';

        }

      });

  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  addToFavorites(): void {

  if (!this.userEmail) {

    this.favoriteMessage =
      'Please login first';

    return;

  }

  this.favoriteService
    .addFavorite(
      this.userEmail,
      this.room.id
    )
    .subscribe({

      next: () => {

        this.isFavorite = true;

        this.favoriteMessage =
          'Room added to favorites ❤️';

      },

      error: (error) => {

        console.error(
          'Favorite error:',
          error
        );

        this.favoriteMessage =
          'Unable to add favorite';

      }

    });

}

}