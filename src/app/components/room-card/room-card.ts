import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Room } from '../../models/room';

@Component({
  selector: 'app-room-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './room-card.html',
  styleUrl: './room-card.css'
})
export class RoomCardComponent {

  @Input() room!: Room;

  constructor(private router: Router) {}

  viewDetails(): void {
    this.router.navigate(['/room', this.room.id]);
  }

}