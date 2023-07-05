import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import Auth from 'src/app/utils/auth';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css'],
})
export class HeaderAdminComponent {
  auth: any = null;
  adminLogin!: boolean;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.auth = Auth.get();
    this.isAdminLogin();
  }

  ngAfterViewInit() {
    this.auth = Auth.get();
  }

  goToVotes() {
    this.router.navigateByUrl('/users');
  }

  isAdminLogin() {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.adminLogin = e.url.indexOf('admin/login') == 1;
      }
    });
  }

  logout() {
    localStorage.removeItem('author');
    this.auth = null;
    this.router.navigateByUrl('/login');
  }
}
