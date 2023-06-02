import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocialService {
  url:String;

  constructor() {
    this.url = environment.baseUrl + '/user';
  }

  redirectFunction(code: string){
    if (window.opener != null && !window.opener.closed) {
      window.opener.postMessage({ message: "status", value: code }, "*");
    }
    window.close();
  }

  login(url: string) {
    let newWin = window.open(
      url,
      '_blank',
      'toolbar=yes,resizable=yes,left=300,width=800,height=800'
    );
    newWin?.focus();
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
