import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TutorService } from 'src/app/services/tutor.service';
import { UserService } from 'src/app/services/user.service';
import { BookingService } from 'src/app/services/booking.service';
import { IUser } from 'src/app/shared/models/user.model';
import Auth from 'src/app/utils/auth';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-myRequests',
  templateUrl: './myRequests.component.html',
  styleUrls: ['./myRequests.component.css']
})
export class MyRequestsComponent implements OnInit {
  bookings: any = [];
  pageable: object = {};
  totalTutors: number = 0;
  totalPages: number = 0;
  message: string = '';
  paymentStatus : any = '';

  constructor(private route: ActivatedRoute, private router: Router, private tutorService: TutorService, private userService: UserService, private bookingService: BookingService) {
  }

  ngOnInit(): void {
    this.paymentStatus = this.route.snapshot.queryParamMap.get('paymentStatus');

    let user = Auth.get();
    this.bookingService.myRequests(user?user.id:0).subscribe({
      next: (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          // this.progress = Math.round((100 * event.loaded) / event.total);
        } else if (event instanceof HttpResponse) {
          this.bookings = event.body;
          this.totalPages = event.body.totalPages || 0;
          this.totalTutors = event.body.totalElements || 0;
          this.pageable = {
            pageNum: 1,
            pageSize: 10,
          }

          console.log("this.bookings",event.body)
        }
      },
      error: (err: any) => {
        console.log(err);
        // this.progress = 0;

        if (err.error && err.error.message) {
          this.message = err.error.message;
        } else {
          this.message = 'Could not sign up!';
        }
      },
    });
    console.log(this.bookings)
    // this.tutorLength = this.tutors.count();
  }
}
