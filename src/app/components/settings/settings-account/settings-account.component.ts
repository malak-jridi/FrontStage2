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
import { UserService } from 'src/app/services/user.service';
import { languages } from '../../../shared/stores/language-data-store';
import Auth from '../../../utils/auth';

@Component({
  selector: 'app-settings-account',
  templateUrl: './settings-account.component.html',
  styleUrls: ['./settings-account.component.css']
})
export class SettingsAccountComponent implements OnInit {
  author: any;
  public languages: any = languages
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    email: new FormControl(''),
    country: new FormControl(''),
    language: new FormControl(''),
    image: new FormControl(''),
    // video: new FormControl(''),
    certification: new FormControl(''),
    rate: new FormControl(''),
    headline: new FormControl(''),
    description: new FormControl(''),
    role: new FormControl(''),
  });
  countries: any = [];
  submitted = false;
  message: string = '';

  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.author = Auth.get();
    if (this.author.role === 'teacher') {
      this.form = this.formBuilder.group(
        {
          name: [this.author.name, Validators.required],
          surname: [
            this.author.surname,
            [
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(20),
            ],
          ],
          email: [this.author.email, [Validators.required, Validators.email]],
          country: [this.author.country, [
            Validators.required,
          ]],
          language: [this.author.language, [
            Validators.required,
          ]],
          rate: [this.author.rate, Validators.required],
          headline: [this.author.headline, Validators.required],
          description: [this.author.description, Validators.required],
          image: [this.author.image],
          // video: [this.author.video],
          certification: [''],
          role: [this.author.role],
        },
      );
    } else if (this.author.role === 'student') {
      this.form = this.formBuilder.group(
        {
          name: [this.author.name, Validators.required],
          surname: [
            this.author.surname,
            [
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(20),
            ],
          ],
          email: [this.author.email, [Validators.required, Validators.email]],
          image: [this.author.image],
          rate: [0],
          certification: [''],
          role: [this.author.role]
        },
      );
    }

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

    const formData = this.form.value;
    if (formData.image === this.author.image) {
      formData.image = '';
    }
    const data: any = JSON.stringify(formData, null, 2);

    this.userService.update(this.author.id, data).subscribe({
      next: (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          // this.progress = Math.round((100 * event.loaded) / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          localStorage.setItem('author', JSON.stringify(event.body.data));
        }
      },
      error: (err: any) => {
        console.log(err);
        // this.progress = 0;

        if (err.error && err.error.message) {
          this.message = err.error.message;
        } else {
          this.message = 'Could not save it!';
        }
      },
    });
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
