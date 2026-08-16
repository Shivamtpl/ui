import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/userService';


@Component({
  selector:'app-user-management',
  standalone:true,
  imports:[
    CommonModule,
    FormsModule
  ],
  templateUrl:'./user-management.html',
  styleUrl:'./user-management.css'
})
export class UserManagement implements OnInit{

  users:any[]=[];

  filteredUsers:any[]=[];

  search='';

  constructor(private userService:UserService){}

  ngOnInit(){

    this.loadUsers();

  }

  loadUsers(){

    this.userService.getUsers().subscribe(data=>{

      this.users=data;

      this.filteredUsers=data;

    });

  }

  searchUsers(){

    this.filteredUsers=this.users.filter(u=>

      u.name.toLowerCase().includes(this.search.toLowerCase()) ||

      u.email.toLowerCase().includes(this.search.toLowerCase())

    );

  }

  delete(id:number){

    if(!confirm("Delete this user?")){

      return;

    }

    this.userService.deleteUser(id).subscribe(()=>{

      this.loadUsers();

    });

  }

}