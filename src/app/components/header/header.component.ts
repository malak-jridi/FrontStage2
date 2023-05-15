import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Auth from 'src/app/utils/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
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
