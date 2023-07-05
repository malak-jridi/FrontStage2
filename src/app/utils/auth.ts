import { NavigationEnd, Router } from '@angular/router';
import { IUser } from '../shared/models/user.model';

export default class Auth {
  constructor(private readonly router: Router) {}

  static set(data: any) {
    localStorage.setItem('author', data);
  }

  static get() {
    if (localStorage.getItem('author') !== null) {
      const session: any = localStorage.getItem('author');
      const author: IUser = JSON.parse(session);
      return author;
    } else {
      return null;
    }
  }
}
