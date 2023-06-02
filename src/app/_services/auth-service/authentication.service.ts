import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Response, User } from '@models';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  url:String;

  constructor(
    private http: HttpClient) {
    this.url = environment.baseUrl + '/common/auth';
  }

  sendOTP(value: string, type: string, token: string): Observable<Response> {
    return this.http.post<Response>(`${this.url}/sendOTP`, {value, type, token}).pipe(
      catchError(this.handleError)
    );
  }

  verifyOTP(value: string, type: string, token: string, code: string): Observable<Response> {
    return this.http.post<Response>(`${this.url}/verifyOTP`, {value, type, token, code}).pipe(
      catchError(this.handleError)
    );
  }

  loginWithPassword(value: string, password: string, type: string, token: string): Observable<Response> {
    return this.http.post<Response>(`${this.url}/login`, {value, type, token, password}).pipe(
      catchError(this.handleError)
    );
  }

  socialLogin(medium: string, code: string): Observable<Response> {
    return this.http.post<Response>(`${this.url}/social`, { medium, code}).pipe(
      catchError(this.handleError)
    );
  }

  logout(): Observable<Response> {
    return this.http.get<Response>(`${this.url}/logout`).pipe(
      catchError(this.handleError)
    );
  }

  users(): Observable<Response> {
    return this.http.get<Response>(`${this.url}/users`).pipe(
      catchError(this.handleError)
    );
  }

  getUserByName(name: string): Observable<Response>{
    return this.http.get<Response>(`${this.url}/users/${name}`).pipe(
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
