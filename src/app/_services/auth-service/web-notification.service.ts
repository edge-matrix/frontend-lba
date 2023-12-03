import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebNotificationService {


  url:String;
  message: BehaviorSubject<string> = new BehaviorSubject('');
  constructor() {
    this.url = environment.baseUrl + '/user';
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
