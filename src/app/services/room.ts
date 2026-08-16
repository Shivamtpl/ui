import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from '../models/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private api = 'http://localhost:8080/rooms';

  constructor(private http: HttpClient) {}

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.api);
  }

  getRoomById(id: number): Observable<Room> {
    return this.http.get<Room>(`${this.api}/${id}`);
  }
addRoom(room: any): Observable<any> {

  return this.http.post<any>(
    'http://localhost:8080/rooms',
    room
  );

}

uploadImage(
  roomId: number,
  file: File
): Observable<any> {

  const formData = new FormData();

  formData.append(
    'file',
    file
  );

  return this.http.post<any>(
    `http://localhost:8080/rooms/${roomId}/upload`,
    formData
  );

}
getRoomsByOwner(
  email: string
): Observable<Room[]> {

  return this.http.get<Room[]>(
    `http://localhost:8080/rooms/owner/${email}`
  );

}

deleteRoom(
  id: number
): Observable<any> {

  return this.http.delete(
    `http://localhost:8080/rooms/${id}`,
    {
      responseType: 'text'
    }
  );

}
updateRoom(
  id: number,
  room: Room
): Observable<Room> {

  return this.http.put<Room>(
    `http://localhost:8080/rooms/${id}`,
    room
  );

}
}