import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import Auth from './utils/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Yousuf';
  isAdminLoggedIn!: boolean;
  isAdminLoginPage!: boolean;

  constructor(private readonly router: Router) {}

  ngOnInit() {
    this.isAdmin();
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.isAdminLoginPage = e.url.indexOf('admin/login') == 1;
      }
    });
  }
  isAdmin() {
    if (Auth.get && Auth.get()?.email == 'test@admin.com')
      this.isAdminLoggedIn = true;
  }
}
