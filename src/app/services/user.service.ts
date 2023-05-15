import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../shared/models/user.model';
import { environment } from '../../environments/environments'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl + '/users';
  }

  public findAll(): Observable<HttpEvent<IUser>> {
    const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');

    const req = new HttpRequest('GET', `${this.baseUrl}`, {
      reportProgress: true,
      responseType: 'json',
      'headers': headers
    });

    return this.http.request(req);
  }

  public findById(id: any): Observable<HttpEvent<IUser>> {
    const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');

    const req = new HttpRequest('GET', `${this.baseUrl}/${id}`, {
      reportProgress: true,
      responseType: 'json',
      'headers': headers
    });

    return this.http.request(req);
  }

  public update(id: number, data: any): Observable<HttpEvent<IUser>> {
    const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');

    const req = new HttpRequest('PUT', `${this.baseUrl}/${id}`, data, {
      reportProgress: true,
      responseType: 'json',
      'headers': headers
    });

    return this.http.request(req);
  }
}

export interface ISignUpRequest {
  email?: string | undefined;
  name?: string | undefined;
  password?: string | undefined;
  role?: string | undefined;
}