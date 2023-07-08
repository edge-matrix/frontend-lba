import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { Response } from '@models';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url:String;

  constructor(
    private http: HttpClient) {
    this.url = environment.baseUrl + '/user';
  }

  getUser(): Observable<Response>{
    return this.http.get<Response>(`${this.url}/user`).pipe(
      catchError(this.handleError)
    );
  }

  getAllUser(page: number): Observable<Response>{
    return this.http.get<Response>(`${this.url}/user?page=${page}`).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(problem: FormData): Observable<Response>{
    return this.http.post<Response>(`${this.url}/user`,problem).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(): Observable<Response>{
    let id = 0 ;
    return this.http.delete<Response>(`${this.url}/user/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  hardDeleteUser(): Observable<Response>{
    let id = 0 ;
    return this.http.delete<Response>(`${this.url}/user/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  updatePassword(oldPassword: string, newPassword: string): Observable<Response>{
    return this.http.post<Response>(`${this.url}/updatePassword`,{
      oldPassword, newPassword
    }).pipe(
      catchError(this.handleError)
    );
  }

  addsocialLogin(medium: string, code: string): Observable<Response> {
    return this.http.post<Response>(`${this.url}/addSocial`, { medium, code}).pipe(
      catchError(this.handleError)
    );
  }

  getUserCoin(): Observable<Response> {
    return this.http.get<Response>(`${this.url}/user-coin`).pipe(
      catchError(this.handleError)
    );
  }

  getCoinLog(page: number): Observable<Response> {
    return this.http.get<Response>(`${this.url}/user-coin-log?page=${page}`).pipe(
      catchError(this.handleError)
    );
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
