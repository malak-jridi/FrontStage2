import { Component, Input, Renderer2, Inject, ViewChild,OnInit } from '@angular/core';
import { ITutor } from 'src/app/shared/models/tutor.model';
import { IBooking } from 'src/app/shared/models/booking.model';

import { DOCUMENT } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ThemePalette } from '@angular/material/core';
import { PopupService } from 'src/app/services/popup.service';
import { BookingService } from 'src/app/services/booking.service';

import Auth from 'src/app/utils/auth';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import {
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  MatTooltipDefaultOptions,
} from '@angular/material/tooltip';

/** Custom options the configure the tooltip's default show/hide delays. */
export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 1000,
  hideDelay: 1000,
  touchendHideDelay: 1000,
};

@Component({
  selector: 'app-booking-card-item',
  templateUrl: './booking-card-item.component.html',
  styleUrls: ['./booking-card-item.component.css'],
  providers: [
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults },
  ],
})
export class BookingCardItemComponent  implements OnInit {
  //date: any;
  public user = Auth.get();
  @Input() booking!: IBooking;
  @ViewChild('picker') picker: any;

  showButton = false;

  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = true;
  public enableMeridian = true;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';

  public formGroup = new FormGroup({
    date: new FormControl(null, [Validators.required]),
    date2: new FormControl(null, [Validators.required]),
  });
  public dateControl = new FormControl(new Date(2021, 9, 4, 5, 6, 7));
  public dateControlMinMax = new FormControl(new Date());
  message: string = '';
  targetDate :any;
  constructor(
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document,
    protected modalService: PopupService,
    protected bookingService: BookingService
  ) {

  }
  ngOnInit(): void {
    this.validateJoinMeetingDate();

  }
  public accept() {
    this.message = 'Wait...';

    this.bookingService.accept(this.booking.id, true).subscribe({
      next: (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          // this.progress = Math.round((100 * event.loaded) / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = 'Booking request accepted';
          this.booking.accepted = true;
        }
      },
      error: (err: any) => {
        console.log(err);
        // this.progress = 0;

        if (err.error && err.error.message) {
          this.message = err.error.message;
        } else {
          this.message = 'Could not send request!';
        }
      },
    });
  }
  /*public book(){
    
    var bookingDate = new Date(this.picker._validSelected);
    var bookingDateStr = bookingDate.getDate()+"-"+(bookingDate.getMonth()+1)+"-"+bookingDate.getFullYear()+";"+bookingDate.getHours()+":"+bookingDate.getMinutes()+":00";
    
    
    this.bookingService.bookNow(bookingDateStr,this.booking.tutor.id, this.user? this.user.id: 0).subscribe({
      next: (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          // this.progress = Math.round((100 * event.loaded) / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message ? event.body.message : "Booking request sent";
        }
      },
      error: (err: any) => {
        console.log(err);
        // this.progress = 0;

        if (err.error && err.error.message) {
          this.message = err.error.message;
        } else {
          this.message = 'Could not send request!';
        }
      },
    });
  }*/
  public ngAfterViewInit() {
    let script = this._renderer2.createElement('script');
    //script.src="https://js.stripe.com/v3/" ;
    //script.type="text/javascript";

    // script.src="https://checkout.stripe.com/checkout.js" ;
    // script.type="text/javascript";

    // var att4 = document.createAttribute("data-key");
    // att4.value= "pk_test_51ID6OKBZahmyM2ZlutBrFdLhIXPvFFMDl35gOqfbKytrZoME2zlgJulkxYmERxOZYKTg0RrcYoZSaiEJiSWbIAC700u0pKbnL6";
    // script.setAttributeNode(att4);

    // var att7 = document.createAttribute("class");
    // att7.value= "stripe-button";
    // script.setAttributeNode(att7);

    // var att8 = document.createAttribute("data-amount");
    // att8.value= "1000";
    // script.setAttributeNode(att8);

    // var att9 = document.createAttribute("data-currency");
    // att9.value= "INR";
    // script.setAttributeNode(att9);

    // var att2 = document.createAttribute("data-name");
    // att2.value= "Baeldung";
    // script.setAttributeNode(att2);

    // var att3 = document.createAttribute("data-description");
    // att3.value= "Spring course checkout";
    // script.setAttributeNode(att3);

    // var att5 = document.createAttribute("data-locale");
    // att5.value= "auto";
    // script.setAttributeNode(att5);

    // var att6 = document.createAttribute("data-zip-code");
    // att6.value= "false";
    // script.setAttributeNode(att6);

    //this._renderer2.appendChild(this._document.getElementById('checkout-form'), script);
  }
  public validateJoinMeetingDate(){
    const currentDate = new Date();
    this.targetDate = new Date(this.booking.bookingDate);
    console.info(currentDate.getDate()  );

    console.info("================="  );
    console.info(this.targetDate.getDate()  );

    if (currentDate.getDate() == this.targetDate.getDate()) {
      this.showButton = true;
    }
  }
}
