import { Injectable } from '@angular/core';

export class Message {
  constructor(
    public type: 'user' | 'assistant',
    public content: string
  ) {
  }
}

export class Dialog {
  messages: Message[] = [];

  constructor(initialMessages?: Message[]) {
    if (initialMessages) {
      this.messages = initialMessages;
    }
  }

  addMessage(message: Message): void {
    this.messages.push(message);
  }
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  dialog: Dialog = new Dialog();

  addUserMessage(message: string): void {
    this.dialog.messages.push(new Message('user', message));
  }

  constructor() { }
}
