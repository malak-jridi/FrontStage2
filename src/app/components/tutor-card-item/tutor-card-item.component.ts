import { Component, Input, Renderer2, Inject, ViewChild  } from '@angular/core';
import { ITutor } from 'src/app/shared/models/tutor.model';
import { DOCUMENT } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ThemePalette } from '@angular/material/core';
import { PopupService } from 'src/app/services/popup.service';
import { BookingService } from 'src/app/services/booking.service';
import {ChangeDetectorRef, ChangeDetectionStrategy} from '@angular/core';

import Auth from 'src/app/utils/auth';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-tutor-card-item',
  templateUrl: './tutor-card-item.component.html',
  styleUrls: ['./tutor-card-item.component.css']
})
export class TutorCardItemComponent {
  //date: any; 
  
  @Input() tutor!: ITutor;
  @ViewChild('picker') picker: any;

  public fromDate = new Date();
  public toDate = new Date();
  public bookDate = new Date();
  public minDate = new Date();
  public disabled = false;
  public hideTime = true;
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
    date2: new FormControl(null, [Validators.required])
  })
  public dateControl = new FormControl(new Date(2021,9,4,5,6,7));
  public dateControlMinMax = new FormControl(new Date());
  message: string = '';

  constructor(
    private _renderer2: Renderer2, 
    @Inject(DOCUMENT) private _document: Document,
    protected modalService : PopupService,
    protected bookingService : BookingService,
    protected cd : ChangeDetectorRef
  ) { 
    this.modalService.clear();
  }


  public book(){
    this.message = "Wait...";
    var user = Auth.get();
    var bookingDateStr = this.bookDate.getDate()+"-"+(this.bookDate.getMonth()+1)+"-"+this.bookDate.getFullYear()+";"+this.bookDate.getHours()+":"+this.bookDate.getMinutes()+":00";
    var bookingFrom = this.fromDate.getHours()+":"+this.fromDate.getMinutes()+":00";
    var bookingTo = this.toDate.getHours()+":"+this.toDate.getMinutes()+":00";

    this.bookingService.bookNow(bookingDateStr,bookingFrom, bookingTo, this.tutor.id, user ? user.id: 0).subscribe({
      next: (event: any) => {

        if (event.type === HttpEventType.UploadProgress) {
          // this.progress = Math.round((100 * event.loaded) / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message ? event.body.message : "Booking request sent";
        }
      },
      error: (err: any) => {
        // this.progress = 0;

        if (err.error && err.error.message) {
          this.message = err.error.message;
        } else {
          this.message = 'Could not send request!';
        }
        console.log(err);
      },
    });
  }

  ngOnInit(): void {
    this.cd.detectChanges();
  }

  ngOnChanges(values : any) {  
    this.cd.detectChanges();
  }

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

}
