import {Component, OnInit, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import {ChatDisplayComponent} from "../chat-display/chat-display.component";
import {ChatService, Message} from "../chat.service";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css'],
})
export class ChatInputComponent implements OnInit {

  @ViewChild('textareaRef', { read: ElementRef }) textareaElement: ElementRef | undefined;

  userMessage: string = '';
  progress: boolean = false;
  @Output() newMessage = new EventEmitter<string>();

  constructor(private chat: ChatService) {}

  ngOnInit(): void {}

  async onKeydown(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 'Enter') {
      this.sendMessage();
      // Add your custom logic here
    }
  }

  async sendMessage() {
    if(this.userMessage == '') {
      return;
    }
    this.progress = true;
    this.newMessage.emit(this.userMessage);
    this.chat.addUserMessage(this.userMessage);
    await delay(2000);
    this.chat.dialog.messages.push(new Message('assistant', "aha"));
    this.userMessage = '';
    this.progress = false;
    console.log(this.textareaElement)
    if(this.textareaElement) {
      this.textareaElement.nativeElement.focus();
    }
  }
}

function delay(ms: number): Promise<void> {
  return new Promise<void>(resolve => setTimeout(resolve, ms));
}
