export abstract class User {
id	              !:number;
name	          ?:string;
surname	          ?:string; 
username	      ?:string; 
email	          ?:string;    
password          ?:string;    	
image	          ?:string;   
video	          !:string;    
certification	!:string;
description?:string;
country	?:string;
language	?:string;
rate	?:string;
role	?:string;
status	!:boolean;
createdAt	?:string;
updatedAt	?:string;
langauge	?:string;
createdAd	?:string;
}

export class Student extends User{

}

export class Tutor extends User{
headline?:string;

} 

export class Booking {
    id?:                                    string ;
    accepted?:boolean
     bookingDate?:string
      bookingFrom?: string
      bookingTo?: string
      createdAt?:string
       paymentStatus?: string
       stripeSessionId?: string
       updatedAt?:string
        studentId?:string
         tutorId?:string
student!:Student;
tutor!:Tutor;

}

export class Transaction extends Booking {

}
