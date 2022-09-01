import { SankeyUser } from '../_shared/sankeyuser.model';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SankeyUserService {
  baseUrl = 'http://localhost:9000'
  // private sankeyUsers: SankeyUser

  constructor(private http: HttpClient) {}

  createSankeyUser(sankeyUser: SankeyUser): Observable<any> {
    console.log('SankeyUsers ', sankeyUser)
    return this.http
    .post(`${this.baseUrl}/sankeyusers/`,sankeyUser)
  }


  getSankeyUsers(token: string | null, searchKey: string, sortingKey: string, sortOrder: string, page: number, filterCity: string): Observable<any> {

    const params = new HttpParams()
    .set('searchKey', searchKey)
    .set('sortingKey', sortingKey)
    .set('sortOrder', sortOrder)
    .set('page', page)
    .set('filterCity', filterCity)
    // console.log('params', params)
    return this.http
    .get(
      `${this.baseUrl}/sankeyusers`,
      {
        headers: {
          'Authorization': 'Bearer '+ token
        },
        params
      }
    )
  }

  loginSankeyUser(body: {email: string, password: string}): Observable<any> {
      return this.http
      .post(`${this.baseUrl}/sankeyusers/login`, body);
  }


  // Error handling
  // errorHandle(error: { error: { message: string; }; status: any; message: any; }) {
  //   let errorMessage = '';
  //   if (error.error instanceof ErrorEvent) {
  //     // Get client-side error
  //     errorMessage = error.error.message;
  //   } else {
  //     // Get server-side error
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   console.log(errorMessage);
  //   return throwError(() => {
  //     return errorMessage;
  //   });
  // }
}
