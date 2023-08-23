import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable,  throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Response } from '@models';

@Injectable({
  providedIn: 'root'
})
export class PlayzoneService {

  url: string;

  constructor(
    private http: HttpClient) {
    this.url = environment.baseUrl + '/common/playzone';
  }

  /* Game Services */
  gameList(page:number): Observable<Response> {
    return this.http.get<Response>(`${this.url}/game?page=${page}`).pipe(
      catchError(this.handleError)
    );
  }

  getGame(slug:string): Observable<Response> {
    return this.http.get<Response>(`${this.url}/game/${slug}`).pipe(
      catchError(this.handleError)
    );
  }

  saveScore(form: any): Observable<Response> {
    return this.http.post<Response>(`${this.url}/game`, form).pipe(
      catchError(this.handleError)
    );
  }

  // Error handling
  handleError(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
 }
}
