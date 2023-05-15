import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewportScroller } from "@angular/common";
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { ITutor } from 'src/app/shared/models/tutor.model';
@Component({
  selector: 'app-tutor-profile',
  templateUrl: './tutor-profile.component.html',
  styleUrls: ['./tutor-profile.component.css']
})
export class TutorProfileComponent implements OnInit {
  tutorId!: number;
  tutor: ITutor = {
    id: 0,
    name: '',
    email: '',
    country: '',
    language: '',
    headline: '',
    description: '',
    image: '',
    video: '',
    rate: 0,
  };
  message: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private scroller: ViewportScroller) {
  }

  ngOnInit() {
    let id: number = this.route.snapshot.params['id'];
    this.tutorId = id;
    this.userService.findById(id).subscribe({
      next: (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          // this.progress = Math.round((100 * event.loaded) / event.total);
        } else if (event instanceof HttpResponse) {
          this.tutor = event.body;
        }
      },
      error: (err: any) => {
        console.log(err);
        // this.progress = 0;

        if (err.error && err.error.message) {
          this.message = err.error.message;
        } else {
          this.message = 'Could not get data!';
        }
      },
    });
  }

  scrollDown(elementId: string) {
    this.scroller.scrollToAnchor(elementId);
  }
}
