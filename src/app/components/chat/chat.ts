import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../services/chat';


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './chat.html',
  styleUrl: './chat.css'
})
export class Chat implements OnInit {

  messages: any[] = [];

  ownerEmail = '';

  customerEmail = '';

  newMessage = '';

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {

    this.ownerEmail =
      this.route.snapshot.paramMap.get('ownerEmail')!;

    const user =
      JSON.parse(localStorage.getItem('user')!);

    this.customerEmail = user.email;

    this.loadMessages();

  }

  loadMessages() {

    this.chatService
      .getChat(
        this.customerEmail,
        this.ownerEmail
      )
      .subscribe(data => {

        this.messages = data;

      });

  }

  send() {

    if (!this.newMessage.trim()) {

      return;

    }

    const message = {

      senderEmail: this.customerEmail,

      receiverEmail: this.ownerEmail,

      message: this.newMessage

    };

    this.chatService
      .send(message)
      .subscribe(() => {

        this.newMessage = '';

        this.loadMessages();

      });

  }

}