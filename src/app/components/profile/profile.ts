import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {

  user: any = null;

  constructor(private router: Router) {}

  ngOnInit(): void {

    const userData = localStorage.getItem('user');

    if (userData) {
      this.user = JSON.parse(userData);
    }

  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

}