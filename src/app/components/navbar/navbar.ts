import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router,  } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

 userName = '';
  userEmail = '';
  showProfile = false;

  constructor(private router: Router) {}

  ngOnInit(): void {

    const user = localStorage.getItem('user');

    if (user) {

      const userData = JSON.parse(user);

      this.userName = userData.name;
      this.userEmail = userData.email;

    } else {

      // Since your backend currently returns only JWT,
      // use the email entered during login if needed.
      this.userName = 'User';

    }

  }

  toggleProfile(): void {
    this.showProfile = !this.showProfile;
  }

  logout(): void {

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.router.navigate(['/']);

  }
openProfile(): void {
  this.router.navigate(['/profile']);
}
 openBookings(): void {

    console.log('My Bookings clicked');

    this.router.navigate([
      '/my-bookings'
    ]);

  }
openFavorites(): void {

  this.router.navigate([
    '/favorites'
  ]);
}
openAdminDashboard(): void {

  this.router.navigate([
    '/admin-dashboard'
  ]);

}
}