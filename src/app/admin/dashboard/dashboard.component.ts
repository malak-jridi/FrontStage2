import { HttpClient ,HttpEventType, HttpResponse} from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { environment } from '../../../environments/environments'
import { Student } from '../models/student';
import { FormBuilder, FormGroup,FormControl,Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  private baseUrl: string;


  students?:Student[]=[];
  
  studentToUpdate = {
    id:'',
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student'
  }



  name!: string;
  email!: string;
  password!: string; 
  isSubmitted = false
  isSignUpSuccess: boolean = false;
  message: string = '';

  formData: FormGroup;

  constructor(private readonly httpService:HttpClient,private formBuilder: FormBuilder,private authService: AuthService, private router: Router){
    this.baseUrl=environment.baseUrl;
    this.formData = this.formBuilder.group({
      name: '',
      surname: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'student'
    });
  }

ngOnInit(){
  this.getStudentsData(); 
}

  getStudentsData(){
  this.httpService.get<Student[]>(`${this.baseUrl}/users/getStudents`)
  .subscribe((x:Student[])=>{
   this.students=x;
  });
  }



  onSubmit(): void {
    if (this.isSubmitted) {
      return
    }
    this.isSubmitted = true;

    const data: any = JSON.stringify(this.formData.value, null, 2);

    const headers = { 
      'Authorization': 'Bearer my-token', 
      'Content-Type': 'application/json'
    };
    const url = `${this.baseUrl}/auth/signup`;
    let response = this.httpService.post(url, data, { headers });
    response.subscribe((data: any) => {
      console.log(data);
      this.ngOnInit();
    });
  }

  edit(studuent: any){
    this.studentToUpdate = studuent;
  }

  updateStudent(){
    const data: any = JSON.stringify(this.studentToUpdate, null, 2);

    console.log(data);

    const headers = { 
      'Authorization': 'Bearer my-token', 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    };

    console.log(this.studentToUpdate.id);
    const url = `${this.baseUrl}/users/`+this.studentToUpdate.id;
    console.log(url);
    let response = this.httpService.put( url, data,{headers});
    response.subscribe((data: any) => {
      console.log(data);
      this.router.navigate(['/admin']);
    });
  }

  deleteStudent(Id:number){
    console.log(Id);
   // this.httpService.delete(`${this.baseUrl}/users/`+Id).subscribe();
    this.httpService.delete(`${this.baseUrl}/users/`+Id, { responseType: 'text' }).subscribe(()=>{
      this.ngOnInit();
    });
  }
  
  
}
