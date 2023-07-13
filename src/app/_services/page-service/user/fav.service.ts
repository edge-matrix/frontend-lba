import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { Response } from '@models';

@Injectable({
  providedIn: 'root'
})
export class FavService {

  url:String;

  constructor(
    private http: HttpClient) {
    this.url = environment.baseUrl + '/user/fav';
  }

  getAll(): Observable<Response>{
    return this.http.get<Response>(`${this.url}`).pipe(
      catchError(this.handleError)
    );
  }

  addFav(type: number, id: number): Observable<Response>{
    return this.http.post<Response>(`${this.url}`, {type, id}).pipe(
      catchError(this.handleError)
    );
  }

  get(id: number): Observable<Response>{
    return this.http.get<Response>(`${this.url}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  deleteFav(type: number, id: number): Observable<Response>{
    return this.http.post<Response>(`${this.url}/delete`, {type, id}).pipe(
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
