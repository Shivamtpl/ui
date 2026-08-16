import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User{
  id:number;
  name:string;
  email:string;
  role:string;
}

@Injectable({
  providedIn:'root'
})
export class UserService{

  private api="http://localhost:8080/users";

  constructor(private http:HttpClient){}

  getUsers():Observable<User[]>{
    return this.http.get<User[]>(this.api);
  }

  deleteUser(id:number){
    return this.http.delete(`${this.api}/${id}`);
  }

}