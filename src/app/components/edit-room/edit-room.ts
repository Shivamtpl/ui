import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from '../../models/room';
import { RoomService } from '../../services/room';

@Component({
  selector: 'app-edit-room',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './edit-room.html',
  styleUrl: './edit-room.css'
})
export class EditRoom implements OnInit {

  roomId!: number;
  room!: Room;

  loading = true;
  saving = false;

  message = '';
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roomService: RoomService
  ) {}

  ngOnInit(): void {

    this.roomId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadRoom();

  }

  loadRoom(): void {

    this.roomService
      .getRoomById(this.roomId)
      .subscribe({

        next: (data: Room) => {

          this.room = data;
          this.loading = false;

        },

        error: (error: any) => {

          console.error(error);

          this.errorMessage =
            'Failed to load room';

          this.loading = false;

        }

      });

  }

  updateRoom(): void {

    this.saving = true;
    this.message = '';
    this.errorMessage = '';

    this.roomService
      .updateRoom(
        this.roomId,
        this.room
      )
      .subscribe({

        next: (data: Room) => {

          this.message =
            'Room updated successfully!';

          this.saving = false;

          setTimeout(() => {

            this.router.navigate([
              '/my-rooms'
            ]);

          }, 1000);

        },

        error: (error: any) => {

          console.error(error);

          this.errorMessage =
            'Failed to update room';

          this.saving = false;

        }

      });

  }

  cancel(): void {

    this.router.navigate([
      '/my-rooms'
    ]);

  }

}