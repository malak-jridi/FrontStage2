import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  name!: string;
  email!: string;
  password!: string;
  formData: FormGroup = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    role: new FormControl('student'),
    remember: new FormControl('')
  })
  isSubmitted = false
  isSignUpSuccess: boolean = false;
  message: string = '';

  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder, private authService: AuthService) {
    this.createForm()
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.formData = new FormGroup({
      // Company name is not mandatory. But if it is applied it should be more than 5 charcters
      name: new FormControl('', [
        Validators.required, // User name is mandatory and should be unique.
        Validators.minLength(4)]), // Minimum user name length should be 4.),
      surname: new FormControl('', [
          Validators.required, // User name is mandatory and should be unique.
          Validators.minLength(4)]), // Minimum user name length should be 4.),
      email: new FormControl('', [
        Validators.required, // Email address is mandatory.
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]), // Password is mandatory.
      role: new FormControl('student'),
      remember: new FormControl('', Validators.requiredTrue) // User should agree to the terms and policies.
    });
  }

  createForm() {
    this.formData = this.formBuilder.group({
      name: '',
      surname: '',
      email: '',
      password: '',
      confirmPassword: '',
      remember: '',
      role: 'student'
    });
  }

  onSubmit(): void {
    if (this.isSubmitted) {
      return
    }
    this.isSubmitted = true;

    const data: any = JSON.stringify(this.formData.value, null, 2);

    this.authService.signUp(data).subscribe({
      next: (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          // this.progress = Math.round((100 * event.loaded) / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          window.location.href = `/`;
          localStorage.setItem('author', JSON.stringify(event.body.data));
        //  this.router.navigate(['/']);
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

    const headers = { 
      'Authorization': 'Bearer my-token', 
      'Content-Type': 'application/json'
    };
    const url = `http://localhost:8585/api/auth/signup`;
    let response = this.http.post(url, data, { headers });
    response.subscribe((data: any) => {
      console.log(data);
      localStorage.setItem('author', data);
      this.router.navigate(['/tutors']);
    });
  }

  onReset(): void {
    this.isSubmitted = false;
    this.formData.reset();
  }
}
