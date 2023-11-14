import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { EncryptDecryptService } from '@service';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class EncryptDecryptAuthInterceptor implements HttpInterceptor {
    constructor(private encryptDecryptService: EncryptDecryptService, ) {}
    // If you want to some exclude api call from Encryption then add here like that.
    // environment.basUrl is your API URL
    ExcludeURLList = [];
    intercept(req: HttpRequest < any > , next: HttpHandler): Observable < HttpEvent < any >> {
        let exludeFound = this.ExcludeURLList.filter(element => {
            return req.url.includes(element)
        });
        // We have Encrypt the GET and POST call before pass payload to API
        if (!(exludeFound && exludeFound.length > 0)) {
            if (req.method == "GET") {
                if (req.url.indexOf("?") > 0 && req.url.split('?').length > 1 ) {
                  let url = req.url.split('?')[0];
                  let params: Array<string> = [];
                  if(req.url.split('?').length > 1 && req.url.split('?')[1] !== ''){
                    req.url.split('?')[1].split('&').forEach(e => {
                      params.push(e.split('=')[0] + '=' +this.encryptDecryptService.base64Encypt(e.split('=')[1] ));
                    });
                    url = url + '?' + params.join('&');
                  }
                  const cloneReq = req.clone({
                    url: url,
                  });
                  return next.handle(cloneReq);
                }
                return next.handle(req);
            } else if (req.method == "POST") {
                if (req.body || req.body.length > 0) {
                  let url = req.url.split('?')[0];
                  let params: Array<string> = [];
                  if(req.url.split('?').length > 1 && req.url.split('?')[1] !== ''){
                    req.url.split('?')[1].split('&').forEach(e => {
                      params.push(e.split('=')[0] + '=' +this.encryptDecryptService.base64Encypt(e.split('=')[1] ));
                    });
                  }
                  url = url + '?' + params.join('&')
                  //URL Body Data
                  Object.keys(req.body).forEach(e => {
                    req.body[e] = this.encryptDecryptService.base64Encypt(req.body[e]);
                  });
                  const cloneReq = req.clone({
                    url: url,
                    body: req.body
                  });
                  return next.handle(cloneReq);
                }
                let data = req.body as FormData;
                return next.handle(req);
            }
        }
        return next.handle(req);
    }
}
