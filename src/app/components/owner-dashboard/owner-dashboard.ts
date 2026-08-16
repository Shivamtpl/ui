import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoomService } from '../../services/room';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owner-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './owner-dashboard.html',
  styleUrl: './owner-dashboard.css'
})
export class OwnerDashboard {

  title = '';
  location = '';
  rent: number | null = null;
  roomType = '';
  description = '';

  selectedFile: File | null = null;

  message = '';
  errorMessage = '';

  latitude: number | null = null;

  longitude: number | null = null;
  constructor(
    private roomService: RoomService,
    private router: Router
  ) { }

  onFileSelected(event: any): void {

    this.selectedFile =
      event.target.files[0];

  }

  addRoom(): void {

    this.message = '';
    this.errorMessage = '';

    if (
      !this.title ||
      !this.location ||
      !this.rent ||
      !this.roomType ||
      !this.description
    ) {

      this.errorMessage =
        'Please fill all required fields';

      return;

    }
    const userData = localStorage.getItem('user');

    if (!userData) {

      this.errorMessage = 'Please login again';

      return;

    }

    const user = JSON.parse(userData);
    const room = {

      title: this.title,

      location: this.location,

      rent: this.rent,

      roomType: this.roomType,

      description: this.description,

      available: true,

      ownerEmail: user.email,

      latitude: this.latitude,

      longitude: this.longitude

    };

    this.roomService
      .addRoom(room)
      .subscribe({

        next: (savedRoom) => {

          this.message =
            'Room added successfully!';

          if (this.selectedFile) {

            this.uploadImage(
              savedRoom.id
            );

          }

          this.clearForm();

        },

        error: (error) => {

          console.error(error);

          this.errorMessage =
            'Failed to add room';

        }

      });

  }

  uploadImage(roomId: number): void {

    if (!this.selectedFile) {
      return;
    }

    this.roomService
      .uploadImage(
        roomId,
        this.selectedFile
      )
      .subscribe({

        next: () => {

          console.log(
            'Image uploaded successfully'
          );

        },

        error: (error) => {

          console.error(
            'Image upload failed:',
            error
          );

        }

      });

  }

  clearForm(): void {

    this.title = '';
    this.location = '';
    this.rent = null;
    this.roomType = '';
    this.description = '';
    this.selectedFile = null;

  }
  goToMyRooms(): void {

    this.router.navigate([
      '/my-rooms'
    ]);

  }
}