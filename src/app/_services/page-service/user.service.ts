import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Response, User } from '@models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url:String;

  constructor(
    private http: HttpClient) {
    this.url = environment.baseUrl + '/shop/user';
  }

  updateUserDetails(id: number, name: string, contact: string): Observable<Response> {
    return this.http.post<Response>(`${this.url}/update-user-details`,{id, name, contact}).pipe(
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
