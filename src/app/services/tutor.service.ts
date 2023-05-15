import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments'

@Injectable({
  providedIn: 'root'
})
export class TutorService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  findAll(): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');

    const payload = {
      globalOperator: "AND",
      pageDto: {
        pageNum: 0,
        pageSize: 10,
        sort: "ASC",
        sortByColumn: 'id'
      },
      searchRequestDto: [
        // {
        //   column: "name",
        //   value: "tutor",
        //   operation: "LIKE"
        // },
        // {
        //   column: "id",
        //   value: "0,10",
        //   operation: "BETWEEN"
        // },
        {
          column: "role",
          value: "teacher",
            operation: "EQUAL"
          // joinTable: "roles",
          // operation: "JOIN"
        }
      ]
    }

    const req = new HttpRequest('POST', `${this.baseUrl}/users/search/pagination`, payload, {
      reportProgress: true,
      responseType: 'json',
      'headers': headers
    });

    return this.http.request(req);
  }
}
