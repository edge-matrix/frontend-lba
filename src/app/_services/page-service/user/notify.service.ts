import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { Response } from '@models';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  url:String;

  constructor(
    private http: HttpClient) {
    this.url = environment.baseUrl + '/user/notify';
  }

  getAll(userId: number,page: number): Observable<Response>{
    return this.http.get<Response>(`${this.url}?cid=${userId}&page=${page}`).pipe(
      catchError(this.handleError)
    );
  }

  get(id: number): Observable<Response>{
    return this.http.get<Response>(`${this.url}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  markAsRead(id: number): Observable<Response>{
    return this.http.get<Response>(`${this.url}/notifyUpdate/read/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  markAsAllRead(): Observable<Response>{
    return this.http.get<Response>(`${this.url}/notifyUpdate/readAll`).pipe(
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
