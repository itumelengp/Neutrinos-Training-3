import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' //application-wide provider
})
export class MessageService {

  messages: string[] = [];
  //constructor() { } no need for the constructor

  add(message:string){
    this.messages.push(message);
  }

  clear(){
    this.messages = [];
  }
}
