import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  url:String;
  constructor(
    private afMessaging: AngularFireMessaging,
    private http: HttpClient,
    private sharedService: SharedService) {
    this.url = environment.baseUrl + '/user';
  }

  subscribeToNotifications() {
    this.afMessaging.requestToken.subscribe((token) => {
          return this.addPushSubscriber(token).subscribe();
        },(error: any) => {
          console.error('Unable to get permission to notify',error);
        },
      );
  }

  addPushSubscriber(token: string | null): Observable<Response>{
    const user_id = this.sharedService.user?.id;
    return this.http.post<Response>(`${this.url}/notification`,{
      user_id, token
    }).pipe(
      catchError(this.handleError)
    );
  }

  listen() {
     this.afMessaging.messages.subscribe((message) => {
      console.log(message);
    });
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
