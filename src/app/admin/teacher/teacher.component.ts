import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Component } from '@angular/core';
import { Tutor } from '../models/student';
import { environment } from '../../../environments/environments'
import { Router } from '@angular/router';


@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent {

  private baseUrl?: string;
  teachers?:Tutor[]=[];
  constructor(private readonly httpService:HttpClient,private router: Router){
    this.baseUrl=environment.baseUrl;

  }

  ngOnInit(){
    this.getTeacher();
  }

  getTeacher(){
    this.httpService.get<Tutor[]>(`${this.baseUrl}/users/getTutors`)
    .subscribe((x:Tutor[])=>{
      this.teachers=x;
    })
  }

  clickCheck(id:any){

    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    console.log(id);
    this.httpService.get(`${this.baseUrl}/users/approved/`+id,{ headers, responseType: 'text' }).subscribe(()=>{
      this.ngOnInit();
    });
   
  }

  downloadCertification(url:string){
    //this.httpService.get(`${url}`).subscribe();
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'certificate.pdf';
    link.click();
  }

  downloadVideo(url:string){
    console.log(url);
   // this.httpService.get(`${url}`).subscribe();

    const link = document.createElement('a');
    link.href = url;
    link.download = 'video.mp4';
    link.click();
  }
  deleteTeahcer(Id:number){
    console.log(Id);
    this.httpService.delete(`${this.baseUrl}/users/`+Id, { responseType: 'text' }).subscribe(()=>{
      this.ngOnInit();
    });
  }



  
}
