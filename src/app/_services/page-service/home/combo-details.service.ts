import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { Orders, Response } from '@models';

@Injectable({
  providedIn: 'root'
})
export class ComboDetailsService {

  url:String;

  constructor(
    private http: HttpClient) {
    this.url = environment.baseUrl + '/common/combo';
  }

  getItemCategories(): Observable<Response> {
    return this.http.get<Response>(`${this.url}/itemCategories`).pipe(
      catchError(this.handleError)
    );
  }

  getShops(data: any): Observable<Response> {
    return this.http.post<Response>(`${this.url}/getShop`, {data}).pipe(
      catchError(this.handleError)
    );
  }

  getShopDetails(slug:string): Observable<Response> {
    return this.http.get<Response>(`${this.url}/getShop/${slug}`).pipe(
      catchError(this.handleError)
    );
  }

  getFavShop(): Observable<Response> {
    return this.http.get<Response>(`${this.url}/getFavShop`).pipe(
      catchError(this.handleError)
    );
  }

  getTopBrands(): Observable<Response> {
    return this.http.get<Response>(`${this.url}/getTopBrands`).pipe(
      catchError(this.handleError)
    );
  }

  getRecommended(): Observable<Response> {
    return this.http.get<Response>(`${this.url}/getRecommended`).pipe(
      catchError(this.handleError)
    );
  }

  getItemById(id: number){
    return this.http.get<Response>(`${this.url}/getItem/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  search(keyword: string){
    return this.http.get<Response>(`${this.url}/search/${keyword}`).pipe(
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
