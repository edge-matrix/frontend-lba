import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Response, User } from '@models';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  url:String;

  constructor(
    private http: HttpClient) {
    this.url = environment.baseUrl + '/shop/request';
  }

  currentOrder(page: number, filter: {selectedOrder: string, orderStatus: number, orderBy: string, orderMode: string}): Observable<Response> {
    return this.http.post<Response>(`${this.url}/current-order?page = ${page}`,{...filter}).pipe(
      catchError(this.handleError)
    );
  }

  currentOrderIds(): Observable<Response> {
    return this.http.get<Response>(`${this.url}/current-order-ids`).pipe(
      catchError(this.handleError)
    );
  }

  ordersList(page: number, filter: {
    orderId: string;
    status: string;
    paymentStatus: string;
    mobile: string;
    orderType: string;
    date: string;
    startDate: string;
    endDate: string;
    orderBy: string,
    orderMode: string,
  }): Observable<Response> {
    return this.http.post<Response>(`${this.url}/orders?page=${page}`,{...filter}).pipe(
      catchError(this.handleError)
    );
  }

  getOrderId(): Observable<Response> {
    return this.http.get<Response>(`${this.url}/new-order-id`).pipe(
      catchError(this.handleError)
    );
  }

  getOrderById(id: number): Observable<Response> {
    return this.http.get<Response>(`${this.url}/order/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createNewOrder(order: FormData): Observable<Response> {
    return this.http.post<Response>(`${this.url}/order`,order).pipe(
      catchError(this.handleError)
    );
  }

  addProduct(id: number, items: string, quantity: string){
    return this.http.post<Response>(`${this.url}/order-product`,{id, items, quantity}).pipe(
      catchError(this.handleError)
    );
  }

  updateStatus(id: number, status: number){
    return this.http.post<Response>(`${this.url}/update-order-status`,{id, status}).pipe(
      catchError(this.handleError)
    );
  }

  rejectOrder(id: number, reason: string, comment: string){
    return this.http.post<Response>(`${this.url}/reject-order-status`,{id, reason, comment}).pipe(
      catchError(this.handleError)
    );
  }

  addPayment(id: number, paymentMethod: number, amount: number){
    return this.http.post<Response>(`${this.url}/order-payment`,{id, paymentMethod, amount}).pipe(
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
