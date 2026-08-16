import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService, DashboardResponse } from '../../services/admin-service';



@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard implements OnInit {

  dashboard?: DashboardResponse;

  loading = true;

  constructor(
    private adminService: AdminService
  ) {}

  ngOnInit(): void {

    this.adminService
      .getDashboard()
      .subscribe({

        next: (data) => {

          this.dashboard = data;
          this.loading = false;

        },

        error: (error) => {

          console.error(error);
          this.loading = false;

        }

      });

  }

}