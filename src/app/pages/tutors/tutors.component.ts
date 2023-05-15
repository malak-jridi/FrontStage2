import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TutorService } from 'src/app/services/tutor.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tutors',
  templateUrl: './tutors.component.html',
  styleUrls: ['./tutors.component.css']
})
export class TutorsComponent implements OnInit {
 

  tutors: any = [];
  pageable: object = {};
  totalTutors: number = 0;
  totalPages: number = 0;
  message: string = '';

  constructor(private router: Router, private tutorService: TutorService, private userService: UserService) {
  }

  ngOnInit(): void {
 
    this.tutorService.findAll().subscribe({
      next: (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          // this.progress = Math.round((100 * event.loaded) / event.total);
        } else if (event instanceof HttpResponse) {
          this.tutors = event.body.content;
          this.totalPages = event.body.totalPages || 0;
          this.totalTutors = event.body.totalElements || 0;
          this.pageable = {
            pageNum: event.body.pageable.pageNumber,
            pageSize: event.body.pageable.pageSize,
          }
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
    console.log(this.tutors)
    // this.tutorLength = this.tutors.count();
  }
}
