import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBooking } from '../shared/models/booking.model';
import { environment } from '../../environments/environments'

@Injectable({
  providedIn: 'root'
})
export class VideoAuthServiceService {
  private baseUrl: string;
  private bookingDetail:any;
  constructor(private http: HttpClient,private readonly httpService:HttpClient) {
    this.baseUrl = environment.baseUrl + '/booking';
  }

  public myRequests(id : number): Observable<HttpEvent<IBooking>> {
    const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');

    const req = new HttpRequest('GET', `${this.baseUrl}/myRequests/booking/${id}`,
    {
      reportProgress: true,
      responseType: 'json',
      'headers': headers
    });

    return this.http.request(req);
  }

  
}
