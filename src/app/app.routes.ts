import { Routes } from '@angular/router';

import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Home } from './components/home/home';
import { RoomDetails } from './components/room-details/room-details';
import { Profile } from './components/profile/profile';
import { MyBookings } from './components/my-bookings/my-bookings';
import { Favorites } from './components/favorites/favorites';
import { OwnerDashboard } from './components/owner-dashboard/owner-dashboard';
import { MyRooms } from './components/my-rooms/my-rooms';
import { EditRoom } from './components/edit-room/edit-room';
import { OwnerBookings } from './components/owner-bookings/owner-bookings';

import { authGuard } from './guards/auth.guard';
import { AdminDashboard } from './components/admin-dashboard/admin-dashboard';
import { UserManagement } from './components/user-management/user-management';
import { Chat } from './components/chat/chat';


export const routes: Routes = [

  // Login
  {
    path: '',
    component: Login
  },

  // Register
  {
    path: 'register',
    component: Register
  },

  // Home
  {
    path: 'home',
    component: Home,
    canActivate: [authGuard]
  },

  // Room Details
  {
    path: 'room/:id',
    component: RoomDetails,
    canActivate: [authGuard]
  },

  // Profile
  {
    path: 'profile',
    component: Profile,
    canActivate: [authGuard]
  },

  // Customer Bookings
  {
    path: 'my-bookings',
    component: MyBookings,
    canActivate: [authGuard]
  },

  // Favorites
  {
    path: 'favorites',
    component: Favorites,
    canActivate: [authGuard]
  },

  // Owner Dashboard
  {
    path: 'owner-dashboard',
    component: OwnerDashboard,
    canActivate: [authGuard]
  },

  // Owner's Rooms
  {
    path: 'my-rooms',
    component: MyRooms,
    canActivate: [authGuard]
  },

  // Edit Room
  {
    path: 'edit-room/:id',
    component: EditRoom,
    canActivate: [authGuard]
  },

  // Owner Booking Requests
  {
    path: 'owner-bookings',
    component: OwnerBookings,
    canActivate: [authGuard]
  },
{
  path: 'admin-dashboard',
  component: AdminDashboard,
  canActivate: [authGuard]
},
{
    path:'user-management',
    component:UserManagement,
    canActivate:[authGuard]
},
{
    path: 'chat/:ownerEmail',
    component: Chat,
    canActivate: [authGuard]
},
  // Unknown URL
  {
    path: '**',
    redirectTo: ''
  }

];