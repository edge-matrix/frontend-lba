import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from '@service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private sharedService: SharedService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // add authorization header with jwt token if available
      if (this.sharedService.user && this.sharedService.user.token) {
          request = request.clone({
              setHeaders: {
                  Authorization: `Bearer ${this.sharedService.user.token}`,
                  ContentType: 'application/json; charset=utf-8',
              }
          });
      }
      return next.handle(request);
    }
}
