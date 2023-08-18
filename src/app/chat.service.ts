import { Injectable } from '@angular/core';
import { Configuration, OpenAIApi } from "openai";
import { environment } from './../environments/environment';
const configuration = new Configuration({
  organization: "org-zFzTxhVU8x8JvCUJD9YwU10r",
  apiKey: environment.openaiApiKey
});

export class Message {
  constructor(
    public role: 'system' | 'user' | 'assistant',
    public content: string | undefined
  ) {
  }

  static createSystemMessage(content: string | undefined) {
    return new Message('system', content);
  }

  static createAssistantMessage(content: string | undefined) {
    return new Message('assistant', content);
  }

  static createUserMessage(content:string | undefined) {
    return new Message('user', content);
  }

}

export class Function {
  name : string;
  description: string;
  parameters : any;


  constructor(name: string, description: string, parameters: any) {
    this.name = name;
    this.description = description;
    this.parameters = parameters;
  }
}

export class Dialog {

  systemMessage: Message;
  messages: Message[];
  functions: Function[];

  constructor(systemMessage: Message, prompts: Message[], functions: Function[]) {
    this.systemMessage = systemMessage;
    this.messages = prompts;
    this.functions = functions;
  }

  addMessage(message: Message): void {
    this.messages.push(message);
  }

  addMessages(messages: Message[]) {
    this.messages.concat(messages);
  }

  getLastMessage() {
    return this.messages[this.messages.length - 1];
  }
}

interface ChatCompletionRequest {
  max_tokens: number;
  messages: any; // Or specify a more detailed type if you know it.
  model: string;
  temperature: number;
  functions?: Function[]; // Assuming functions is an array. Specify a more detailed type if known.
  function_call?: string;
}

class OpenAIService {
  openai : OpenAIApi;
  constructor() {
    this.openai = new OpenAIApi(configuration);
  }

  async chat(dialog : Dialog) {
    const messagesToSend = [dialog.systemMessage].concat(dialog.messages);
    console.log(messagesToSend);
    try {
      let chatCompletionRequest: ChatCompletionRequest = {
        max_tokens: 2048,
        messages: messagesToSend,
        model: "gpt-3.5-turbo-16k-0613",
        temperature: 0.1
      };
      if(dialog.functions != null && dialog.functions.length > 0) {
        chatCompletionRequest.functions = dialog.functions;
        chatCompletionRequest.function_call = 'auto';
      }
      const completion = await this.openai.createChatCompletion(chatCompletionRequest, {});
      // @ts-ignore
      dialog.addMessage(Message.createAssistantMessage(completion.data.choices[0].message.content));
    } catch (e) {
      console.error(e);
      dialog.addMessage(Message.createAssistantMessage("⚠️ An unexpected error occurred. Please try again later."))
    }

  }
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  dialog: Dialog = new Dialog(Message.createSystemMessage('You are a useful assistant'), [], []);
  openai: OpenAIService = new OpenAIService();

  async say(message: string) {
    this.dialog.messages.push(Message.createUserMessage(message));
    await this.openai.chat(this.dialog);
  }

  constructor() { }
}
