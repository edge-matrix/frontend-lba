import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { Response } from '@models';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  url:String;

  constructor(
    private http: HttpClient) {
    this.url = environment.baseUrl + '/common';
  }

  contactUs(details: any): Observable<Response>{
    return this.http.post<Response>(`${this.url}/contact`,details).pipe(
      catchError(this.handleError)
    );
  }

  campusForm(details: any): Observable<Response>{
    return this.http.post<Response>(`${this.url}/submitCampusData`,details).pipe(
      catchError(this.handleError)
    );
  }

  vendorForm(details: any): Observable<Response>{
    return this.http.post<Response>(`${this.url}/vendor-form`,details).pipe(
      catchError(this.handleError)
    );
  }

  onBoardingForm(details: FormData): Observable<Response>{
    return this.http.post<Response>(`${this.url}/shop-onboarding`,details).pipe(
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
