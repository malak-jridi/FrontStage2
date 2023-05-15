import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBooking } from '../shared/models/booking.model';
import { environment } from '../../environments/environments'

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl + '/booking';
  }

  public myRequests(userId : number): Observable<HttpEvent<IBooking>> {
    const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');

    const req = new HttpRequest('GET', `${this.baseUrl}/myRequests/${userId}`,
    {
      reportProgress: true,
      responseType: 'json',
      'headers': headers
    });

    return this.http.request(req);
  }

  public bookNow(bookingDate : string, bookingFrom : string, bookingTo : string, tutorId : number, userId : number): Observable<HttpEvent<IBooking>> {
    const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');

    const req = new HttpRequest('POST', `${this.baseUrl}/bookNow`,
    {
      "accept" : false,
      "bookingDate" : bookingDate,
      "bookingFrom" : bookingFrom,
      "bookingTo" : bookingTo,
      "tutorId" : tutorId,
      "studentId" : userId
    },
    {
      reportProgress: true,
      responseType: 'json',
      'headers': headers
    });

    return this.http.request(req);
  }

  public accept(bookingId : number, accept : boolean): Observable<HttpEvent<IBooking>> {
    const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');

    const req = new HttpRequest('POST', `${this.baseUrl}/bookingAction`,
    {
      "accept" : accept,
      "bookingId" : bookingId
    },
    {
      reportProgress: true,
      responseType: 'json',
      'headers': headers
    });

    return this.http.request(req);
  }

}

export interface IBookingRequest {


  email?: string | undefined;
  name?: string | undefined;
  password?: string | undefined;
  role?: string | undefined;
}