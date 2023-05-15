import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  login(email: string, password: string) {
    return this.http.get(`${this.baseUrl}/users/login?email=${email}&Password=${password}`, {responseType: 'text'});
  }

  signUp(payload: any): Observable<HttpEvent<any>> {
    const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');

    const req = new HttpRequest('POST', `${this.baseUrl}/auth/signup`, payload, {
      reportProgress: true,
      responseType: 'json',
      'headers': headers
    });

    return this.http.request(req);
  }

  resetPassword(id: string, payload: any): Observable<HttpEvent<any>> {
    const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');

    const req = new HttpRequest('POST', `${this.baseUrl}/users/${id}/reset-password`, payload, {
      reportProgress: true,
      responseType: 'json',
      'headers': headers
    });

    return this.http.request(req);
  }

  updateUser(payload: any): Observable<HttpEvent<any>> {
    const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');

    const req = new HttpRequest('PUT', `${this.baseUrl}/users/`, payload, {
      reportProgress: true,
      responseType: 'json',
      'headers': headers
    });

    return this.http.request(req);
  }
}
