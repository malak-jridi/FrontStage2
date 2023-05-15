import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../environments/environments'
import { Booking } from '../models/student';
@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent {
  private baseUrl?: string;
  bookings?:Booking[]=[];

  constructor(private readonly httpService:HttpClient){
    this.baseUrl=environment.baseUrl;

  }

  ngOnInit(){
    this.getBookings();
  }

  getBookings(){
    this.httpService.get<Booking[]>(`${this.baseUrl}/booking/bookinglist`)
    .subscribe((x:Booking[])=>{
      this.bookings=x;
    })
  }


}