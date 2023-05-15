import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { environment } from '../../environments/environments'
import { ISignUpRequest } from './user.service';

@Injectable()
export class HttpClientService {
  private http: HttpClient;
  private baseUrl: string;

  constructor(@Inject(HttpClient) http: HttpClient) {
    this.http = http;
    this.baseUrl = environment.baseUrl;
  }

  /**
   * register
   * @param data signUpRequest
   * @return OK
   */
  registerUsingPOST(data: ISignUpRequest) {
    let url = this.baseUrl + "/api/auth/signup";
    url = url.replace(/[?&]$/, "");
    const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };

    return this.http.post(url, data, { headers });
  }
}