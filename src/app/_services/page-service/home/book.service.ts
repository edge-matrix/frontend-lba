import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { Orders, Response } from '@models';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  url:String;

  constructor(
    private http: HttpClient) {
    this.url = environment.baseUrl + '/common/book';
  }

  placeOrder(order: any): Observable<Response>{
    return this.http.post<Response>(`${this.url}/order`,order).pipe(
      catchError(this.handleError)
    );
  }

  couponCode(code: string){
    return this.http.get<Response>(`${this.url}/getCoupon/${code}`).pipe(
      catchError(this.handleError)
    );
  }

  moreCoupon(shopId: number){
    return this.http.get<Response>(`${this.url}/moreCouponCode/${shopId}`).pipe(
      catchError(this.handleError)
    );
  }

  orderDetails(order: string){
    return this.http.get<Response>(`${this.url}/getOrder/${order}`).pipe(
      catchError(this.handleError)
    );
  }

  // updatePaymentDetails(data: { paymentMethod: number; transactionId: string;}){
  //   return this.http.post<Response>(`${this.url}/updatePaymentDetails`,{
  //     'orderId': data.transactionId,
  //     'paymentMethod': data.paymentMethod
  //   }).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  updatePaymentDetails(data: { orderStatus: number, paymentMethod: number; transactionId?: string; payment_id?: string, orderDetails_id?: string}){
    return this.http.post<Response>(`${this.url}/updatePaymentDetails`,{
      'orderId': data.orderDetails_id,
      'paymentMethod': data.paymentMethod,
      'payment_request_id': data.transactionId,
      'payment_id': data.payment_id,
      'status': data.orderStatus
    }).pipe(
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
