import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { SharedService } from '@service';

@Injectable()
export class InternetInterceptor implements HttpInterceptor {constructor(private sharedService: SharedService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // check to see if there's internet
    if (!window.navigator.onLine) {
      // if there is no internet, throw a HttpErrorResponse error
      // since an error is thrown, the function will terminate here
      console.log("Internet is Missing...");
      this.sharedService.showMessage(1,"Internet is Missing...");
      return throwError(() => new HttpErrorResponse({ error: 'Internet is required.' }));

    } else {
      // else return the normal request
      return next.handle(request);
    }
  }
}
