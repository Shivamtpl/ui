import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Room } from '../../models/room';
import { RoomService } from '../../services/room';

@Component({
  selector: 'app-my-rooms',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-rooms.html',
  styleUrl: './my-rooms.css'
})
export class MyRooms implements OnInit {

  rooms: Room[] = [];
  loading = true;
  userEmail = '';

  constructor(
    private roomService: RoomService,
    private router: Router
  ) {}

  ngOnInit(): void {

    const userData =
      localStorage.getItem('user');

    if (!userData) {

      this.router.navigate(['/']);

      return;

    }

    const user =
      JSON.parse(userData);

    this.userEmail = user.email;

    this.loadMyRooms();

  }

  loadMyRooms(): void {

    this.loading = true;

    this.roomService
      .getRoomsByOwner(this.userEmail)
      .subscribe({

        next: (data: Room[]) => {

          this.rooms = data;

          this.loading = false;

        },

        error: (error: any) => {

          console.error(
            'Failed to load rooms:',
            error
          );

          this.loading = false;

        }

      });

  }

  editRoom(id: number): void {

    this.router.navigate([
      '/edit-room',
      id
    ]);

  }

  deleteRoom(id: number): void {

    const confirmDelete =
      confirm(
        'Are you sure you want to delete this room?'
      );

    if (!confirmDelete) {
      return;
    }

    this.roomService
      .deleteRoom(id)
      .subscribe({

        next: () => {

          this.rooms =
            this.rooms.filter(
              room => room.id !== id
            );

        },

        error: (error: any) => {

          console.error(
            'Delete failed:',
            error
          );

        }

      });

  }

  addRoom(): void {

    this.router.navigate([
      '/owner-dashboard'
    ]);

  }

}