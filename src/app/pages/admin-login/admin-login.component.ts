import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent {
  email!: string;
  password!: string;
  response: any;
  errorMessage: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private errorHandler: ErrorHandlerService,
    private authService: AuthService
  ) {}

  onSubmit() {
    this.authService.adminLogin(this.email, this.password).subscribe({
      next: (data) => {
        this.response = data;
        console.log(data);
        console.log(this.response);
        if (data) {
          window.location.href = `/admin`;

          localStorage.setItem('author', data);
          //this.router.navigate(['/tutors']);
          // this.router.navigate(['/signin'], {queryParams: {email: this.email, password: this.password}});
        } else {
          console.log('Login failed');
        }
      },
      error: (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      },
    });
  }
}
