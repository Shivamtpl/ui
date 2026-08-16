import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FavoriteService } from '../../services/favorite';


@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css'
})
export class Favorites implements OnInit {

  favorites: any[] = [];
  userEmail = '';
  loading = true;

  constructor(
    private favoriteService: FavoriteService,
    private router: Router
  ) {}

  ngOnInit(): void {

    const userData = localStorage.getItem('user');

    if (userData) {

      const user = JSON.parse(userData);

      this.userEmail = user.email;

      this.loadFavorites();

    } else {

      this.router.navigate(['/']);

    }

  }

  loadFavorites(): void {

    this.favoriteService
      .getFavorites(this.userEmail)
      .subscribe({

        next: (data) => {

          this.favorites = data;
          this.loading = false;

        },

        error: (error) => {

          console.error(
            'Failed to load favorites:',
            error
          );

          this.loading = false;

        }

      });

  }

  viewRoom(roomId: number): void {

    this.router.navigate([
      '/room',
      roomId
    ]);

  }

  goBack(): void {

    this.router.navigate(['/home']);

  }

}