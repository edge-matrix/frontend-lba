import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '@service';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private toastr: ToastrService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
          if (err.status === 0 && err.error instanceof ProgressEvent) {
            // A client-side or network error occurred. Handle it accordingly.
          }
          if ([401,403].includes(err.status)) {
              // auto logout if 401 response returned from api
              this.authenticationService.logout().subscribe(() => {
                localStorage.removeItem('currentUser');
                location.reload();
              },
              error => {
                console.log('Unable to Logout');
                localStorage.removeItem('currentUser');
                location.reload();
              });
          }
          if (err.statusText == 'Unknown Error') {
            this.toastr.error("Internet is Missing...");
          }
          const error = 'something went wrong';
          return throwError(() => error);
        }))
    }
}
