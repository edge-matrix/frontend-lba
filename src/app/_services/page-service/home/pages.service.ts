import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable,  throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Response } from '@models';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  url: string;

  constructor(
    private http: HttpClient) {
    this.url = environment.baseUrl + '/common/pages';
  }

  /* Stories Services */
  storiesList(page:number): Observable<Response> {
    return this.http.get<Response>(`${this.url}/stories?page=${page}`).pipe(
      catchError(this.handleError)
    );
  }

  getStories(slug:string): Observable<Response> {
    return this.http.get<Response>(`${this.url}/stories/${slug}`).pipe(
      catchError(this.handleError)
    );
  }

  getShortLink(link:string, type: number): Observable<Response> {
    return this.http.post<Response>(`${this.url}/short-link`, {link, type}).pipe(
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
