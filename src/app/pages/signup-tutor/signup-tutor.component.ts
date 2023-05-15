import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth-service.service';
import { languages } from '../../shared/stores/language-data-store';
import Validation from '../../utils/validation';

@Component({
  selector: 'app-signup-tutor',
  templateUrl: './signup-tutor.component.html',
  styleUrls: ['./signup-tutor.component.css']
})
export class SignupTutorComponent implements OnInit {
  public languages: any = languages
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    country: new FormControl(''),
    language: new FormControl(''),
    image: new FormControl(''),
    video: new FormControl(''),
    certification: new FormControl(''),
    rate: new FormControl(''),
    headline: new FormControl(''),
    description: new FormControl(''),
    acceptTerms: new FormControl(false),
    role: new FormControl('teacher'),
    remember: new FormControl('false')
  });
  countries: any = [];
  step = 1;
  submitted = false;
  isSignUpSuccess: boolean = false;
  message: string = '';

  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        name: ['', Validators.required],
        surname: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
          ],
        ],
        confirmPassword: ['', Validators.required],
        country: ['', [
          Validators.required,
        ]],
        language: ['', [
          Validators.required,
        ]],
        rate: ['5'],
        headline: [''],
        description: [''],
        image: [''],
        video: [''],
        certification: [''],
        role: ['teacher'],
        acceptTerms: [false, Validators.requiredTrue],
        // remember: ['', Validators.requiredTrue]
      },
      {
        validators: [Validation.match('password', 'confirmPassword')],
      }
    );

    this.http.get('https://trial.mobiscroll.com/content/countries.json').subscribe((resp: any) => {
        const data = [];
        for (let i = 0; i < resp.length; ++i) {
            const country = resp[i];
            data.push({ name: country.text, value: country.value });
        }
        this.countries = data;
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  fileUpload(path: string, format: string): void {
    this.form.patchValue({
      [format]: path
    })
    console.log(path)
  }

  onSubmit(): void {
    this.submitted = true;
    
    if (this.form.invalid) {
      return;
    }

    const data: any = JSON.stringify(this.form.value, null, 2);

    if (this.step !== 6) {
      this.step += 1;
    } else {
      this.authService.signUp(data).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            // this.progress = Math.round((100 * event.loaded) / event.total);
          } else if (event instanceof HttpResponse) {
            this.message = event.body.message;
          //  localStorage.setItem('author', JSON.stringify(event.body.data));
            this.router.navigate(['/']);
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
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
