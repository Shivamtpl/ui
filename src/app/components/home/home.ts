import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Navbar } from '../navbar/navbar';

import { Room } from '../../models/room';
import { RoomService } from '../../services/room';
import { Footer } from '../footer/footer';
import { Hero } from '../hero/hero';
import { RoomCardComponent } from '../room-card/room-card';
import { SearchFilterComponent } from '../search-filter/search-filter';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    Navbar, Footer,Hero,SearchFilterComponent,
    RoomCardComponent,
    
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  rooms: Room[] = [];
  filteredRooms: Room[] = [];

  constructor(private roomService: RoomService) { }

 ngOnInit(): void {

  this.roomService.getRooms().subscribe({

    next: (data) => {

      this.rooms = data;

      this.filteredRooms = [...this.rooms];

    },

    error: (err) => {

      console.error('Failed to load rooms', err);

    }

  });
}
applyFilter(filter: any): void {

  const searchText = filter.searchText
    .toLowerCase()
    .trim();

  const location = filter.location
    .toLowerCase()
    .trim();

  this.filteredRooms = this.rooms.filter(room => {

    const matchesSearch =
      !searchText ||
      room.title.toLowerCase().includes(searchText) ||
      room.description.toLowerCase().includes(searchText);

    const matchesLocation =
      !location ||
      room.location.toLowerCase().includes(location);

    const matchesType =
      !filter.roomType ||
      room.roomType === filter.roomType;

    const matchesMinRent =
      filter.minRent === null ||
      room.rent >= filter.minRent;

    const matchesMaxRent =
      filter.maxRent === null ||
      room.rent <= filter.maxRent;

    return (
      matchesSearch &&
      matchesLocation &&
      matchesType &&
      matchesMinRent &&
      matchesMaxRent
    );

  });

}

}