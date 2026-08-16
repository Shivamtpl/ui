import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private api = 'http://localhost:8080/messages';

  constructor(private http: HttpClient) {}

  send(message: any): Observable<any> {
    return this.http.post(this.api, message);
  }

  getChat(user1: string, user2: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.api}?user1=${user1}&user2=${user2}`
    );
  }

}