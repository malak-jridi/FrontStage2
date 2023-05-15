import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { IBooking } from 'src/app/shared/models/booking.model';
import { VideoAuthServiceService } from 'src/app/services/video-auth-service.service';
import { environment } from 'src/environments/environments';
import Auth from 'src/app/utils/auth';

import { Observable } from 'rxjs';

declare var OT: any;

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.css'],
})
export class VideoCallComponent implements OnInit {
  session: any;
  socket: any;
  publisher: any;
  subscriber: any;
  apiKey: string = '47710331';
  sessionId: any;
  token: any;
  private baseUrl: string;
  loginuser: any = Auth.get();

  booking: any;

  //  public connect(): void {
  //     this.socket = new SockJS('http://localhost:8585/api/chat');
  //    this.stompClient = Stomp.over(this.socket);
  //    this.stompClient.connect({}, () => {
  //      console.log('Connected to WebSocket');
  //    });
  //  }

  public isChildLoaded = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private videoAuthService: VideoAuthServiceService,
    private readonly httpService: HttpClient
  ) {
    this.baseUrl = environment.baseUrl + '/booking';
  }

  ngOnInit(): void {
    let id: number = this.route.snapshot.params['id'];

    this.httpService
      .get<IBooking>(`${this.baseUrl}/myRequests/booking/${id}`)
      .subscribe((x: IBooking) => {
        this.booking = x;

        console.log('Date ', JSON.stringify(this.booking));

        if (x.sessionId != null && x.tokenId != null) {
          this.sessionId = x.sessionId;
          this.token = x.tokenId;

          this.session = OT.initSession(this.apiKey, x.sessionId);
          this.session.connect(this.token, (error: any) => {
            if (error) {
              console.log('Error connecting to the session', error);
              //   this.router.navigate(['/myRequests']);
            } else {
              console.log('Connected to the session');
              this.publisher = OT.initPublisher('publisher', {
                insertMode: 'append',
                width: '800px',
                height: '460px',
              });
              this.session.publish(this.publisher, (error: any) => {
                if (error) {
                  console.log('Error publishing the stream', error);
                } else {
                  console.log('Stream published');
                }
              });
            }
          });
          this.session.on('streamCreated', (event: any) => {
            console.log('Stream created', event);
            this.subscriber = this.session.subscribe(
              event.stream,
              'subscriber',
              {
                insertMode: 'append',
                width: '800px',
                height: '460px',
              },
              (error: any) => {
                if (error) {
                  console.log('Error subscribing to the stream', error);
                } else {
                  console.log('Subscribed to the stream');
                }
              }
            );
          });
        }
      });
    setTimeout(() => {
      this.isChildLoaded = true;
    }, 1000);
    console.log(' Hello Chat Mod 1  ' + JSON.stringify(this.booking)); // This will log the object passed from the outer component
  }

  getSessionAndTokenInfo(id: number) {
    this.httpService
      .get<IBooking>(`${this.baseUrl}/myRequests/booking/${id}`)
      .subscribe((x: IBooking) => {});
  }
  endCall() {
    if (this.session) {
      this.session.disconnect();
      this.router.navigate(['/myRequests']);
    }
  }
}
