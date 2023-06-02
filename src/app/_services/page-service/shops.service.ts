import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Response, User } from '@models';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  url:String;

  constructor(
    private http: HttpClient) {
    this.url = environment.baseUrl + '/shop/vendor';
  }

  shopCategoriesList(): Observable<Response> {
    return this.http.get<Response>(`${this.url}/shop-categories`).pipe(
      catchError(this.handleError)
    );
  }

  currentShopProfile(): Observable<Response> {
    return this.http.get<Response>(`${this.url}/shop`).pipe(
      catchError(this.handleError)
    );
  }

  updateShop(shop: FormData): Observable<Response>{
    return this.http.post<Response>(`${this.url}/shop/0`,shop).pipe(
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
