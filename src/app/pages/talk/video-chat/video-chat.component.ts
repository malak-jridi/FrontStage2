import {
  Component,
  Input,
  Renderer2,
  Inject,
  ViewChild,
  OnInit,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { IBooking } from 'src/app/shared/models/booking.model';
import { VideoAuthServiceService } from 'src/app/services/video-auth-service.service';
import { environment } from 'src/environments/environments';
import { FormsModule } from '@angular/forms';
import { Message } from '../Message';
import Auth from 'src/app/utils/auth';

declare var SockJS: any;
declare var Stomp: any;

@Component({
  selector: 'app-video-chat',
  templateUrl: './video-chat.component.html',
  styleUrls: ['./video-chat.component.css'],
})
export class VideoChatComponent implements OnInit {
  public user = Auth.get();
  @Input() booking!: IBooking;

  message : string='';

  private recipientUrl = '/ws/hello';

  private stompClient: any;

  constructor() {
    console.log(' Chat Component Define 21 ' + JSON.stringify(this.booking)); // This will log the object passed from the outer component
  }

  ngOnInit() {
    console.log('Chat Component Define 12' + JSON.stringify(this.booking)); // This will log the object passed from the outer component
    this.connect();
  }
  onChange(event: any) {
    this.message = event.target.value;
    console.log(this.message+"   ====")
  }

  // connect() {
  //   const serverUrl = 'http://localhost:8585/ws';
  //   const ws = new SockJS(serverUrl);
  //   this.stompClient = Stomp.over(ws);
  //   const that = this;
  //   // tslint:disable-next-line:only-arrow-functions
  //   this.stompClient.connect({}, () => { setTimeout(() => {
  //     this.sendMessage();
  //     console.log('Connected: ');
  //     this.stompClient.subscribe('/topic/messages',(message: any) => {
  //         console.log('Received: ' + message.body);
  //       }
  //     );
  //   }, 5000);

  //   });
  // }

  // public sendMessage() {
  //   this.stompClient.send(
  //     '/ws/message',
  //     {},
  //     JSON.stringify({ messageContent: 'Hello 11' })
  //   );
  // }
  public  messages: Message[] = [];

  connect() {
    var socket = new SockJS('http://localhost:8585/ws');
    this.stompClient = Stomp.over(socket);
    var topic = `/app/chat/${this.booking.sessionId}`;
    var username = this.user?.name;
    this.stompClient.connect({}, (frame: any) => {
      console.log('Connected: ' + frame);
      //this.stompClient.send('/app/message', {}, JSON.stringify({ messageContent: 'Hello 11' }));
      var currentSubscription = this.stompClient.subscribe(`/topic/${this.booking.sessionId}`, (message :any) => {
        const chatMessage = JSON.parse(message.body);
        console.log(chatMessage);
        this.messages.push(chatMessage);
      });
      this.stompClient.send(
        `${topic}/addUser`,
        {},
        JSON.stringify({ sender: username, type: 'JOIN' })
      );
    });

  
  }


  sendMessage() {
    var username = this.user?.name;
    var roomId = this.booking.sessionId;
    var topic = `/app/chat/${roomId}`;

    var chatMessage = {
      sender: username,
      content: this.message,
      type: 'CHAT',
    };

    this.stompClient.send(
      `${topic}/sendMessage`,
      {},
      JSON.stringify(chatMessage)
    );
  }

  
}


