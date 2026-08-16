import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-filter.html',
  styleUrl: './search-filter.css'
})
export class SearchFilterComponent {

  searchText = '';
  location = '';
  roomType = '';
  minRent: number | null = null;
  maxRent: number | null = null;

  @Output() filterChanged = new EventEmitter<any>();

  applyFilter(): void {

    this.filterChanged.emit({
      searchText: this.searchText,
      location: this.location,
      roomType: this.roomType,
      minRent: this.minRent,
      maxRent: this.maxRent
    });

  }

  clearFilter(): void {

    this.searchText = '';
    this.location = '';
    this.roomType = '';
    this.minRent = null;
    this.maxRent = null;

    this.applyFilter();

  }

}