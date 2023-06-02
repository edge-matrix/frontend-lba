import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Response, User } from '@models';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  url:String;

  constructor(
    private http: HttpClient) {
    this.url = environment.baseUrl + '/shop/items';
  }

  itemCategoriesList(): Observable<Response> {
    return this.http.get<Response>(`${this.url}/item-categories`).pipe(
      catchError(this.handleError)
    );
  }

  addItemCategories(form: FormData): Observable<Response> {
    return this.http.post<Response>(`${this.url}/item-categories`,form).pipe(
      catchError(this.handleError)
    );
  }

  itemList(page: number, catId: number): Observable<Response> {
    return this.http.get<Response>(`${this.url}/item?page = ${page}&items_categories_id=${catId}`).pipe(
      catchError(this.handleError)
    );
  }

  items(catId: number, searchKeyword: string): Observable<Response> {
    return this.http.post<Response>(`${this.url}/items`,{catId, searchKeyword}).pipe(
      catchError(this.handleError)
    );
  }

  getItem(id: number): Observable<Response> {
    return this.http.get<Response>(`${this.url}/item/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  addItems(form: FormData): Observable<Response> {
    return this.http.post<Response>(`${this.url}/item`,form).pipe(
      catchError(this.handleError)
    );
  }

  updateItems(id:number, items: FormData): Observable<Response>{
    return this.http.post<Response>(`${this.url}/item/${id}`,items).pipe(
      catchError(this.handleError)
    );
  }

  updateItemStatus(id:number, status: number): Observable<Response>{
    return this.http.post<Response>(`${this.url}/item-update-status`,{id, status}).pipe(
      catchError(this.handleError)
    );
  }

  deleteItems(id: number){
    return this.http.delete<Response>(`${this.url}/item/${id}`).pipe(
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
