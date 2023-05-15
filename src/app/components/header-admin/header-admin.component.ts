import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Auth from 'src/app/utils/auth';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent {
  auth: any = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.auth = Auth.get();
  }

  ngAfterViewInit() {
    this.auth = Auth.get();
  }

  goToVotes() {
    this.router.navigateByUrl('/users');
  }

  logout() {
    localStorage.removeItem('author');
    this.auth = null;
    this.router.navigateByUrl('/login');
  }
}
