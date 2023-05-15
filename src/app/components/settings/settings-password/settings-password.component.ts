import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth-service.service';
import Validation from '../../../utils/validation';
import Auth from '../../../utils/auth';

@Component({
  selector: 'app-settings-password',
  templateUrl: './settings-password.component.html',
  styleUrls: ['./settings-password.component.css']
})
export class SettingsPasswordComponent implements OnInit {
  author: any;
  form: FormGroup = new FormGroup({
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });
  submitted = false;
  message: string = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.author = Auth.get();
    if (this.author) {
      this.form = this.formBuilder.group(
        {
          password: ['',
            [
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(40),
            ],
          ],
          confirmPassword: ['', Validators.required],
        },
        {
          validators: [Validation.match('password', 'confirmPassword')],
        }
      );
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    console.log('submit')
    if (this.form.invalid) {
      return;
    }

    const data: any = JSON.stringify(this.form.value, null, 2);

    this.authService.resetPassword(this.author.id, data).subscribe({
      next: (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          // this.progress = Math.round((100 * event.loaded) / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
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
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
