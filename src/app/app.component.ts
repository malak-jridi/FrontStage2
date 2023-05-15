import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Yousuf';
  isAdminLoggedIn!:boolean;

  constructor(private readonly router:Router){

  }

  ngOnInit(){
    this.isAdmin();
  }
isAdmin(){
  this.router.events.subscribe((e) => {
    if (e instanceof NavigationEnd) {
      this.isAdminLoggedIn = e.url.indexOf('admin')== 1
    }
  });
}
}
