import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { JwtInterceptor, ErrorInterceptor, InternetInterceptor, LoaderInterceptor, SentryErrorHandler } from './_helpers';
import { AuthGuard } from './_guards';
import { AppComponent } from './app.component';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { PageNotFoundComponent, LoginComponent } from './_shared';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
// import { AngularFireModule } from '@angular/fire/compat';
// import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,

    /* Auth Components*/
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 3000, // 15 seconds
      progressBar: true,
      maxOpened: 2,
      preventDuplicates: true
    }),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    ServiceWorkerModule.register('firebase-messaging-sw.js', {
      enabled: environment.production,
      registrationStrategy: 'registerImmediately'
    }),
    RecaptchaV3Module,
    // AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFireMessagingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InternetInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.GoogleCaptchaKey },
    {provide: ErrorHandler, useClass: SentryErrorHandler},
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
