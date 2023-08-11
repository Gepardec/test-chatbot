import { Component, OnInit } from '@angular/core';
import {ChatService, Message} from "../chat.service";

@Component({
  selector: 'app-chat-display',
  templateUrl: './chat-display.component.html',
  styleUrls: ['./chat-display.component.css']
})
export class ChatDisplayComponent implements OnInit {
  messages: Message[] = [];

  constructor(private chat: ChatService) {
    this.messages = chat.dialog.messages;
  }

  ngOnInit(): void {}
}
