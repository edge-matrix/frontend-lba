import { Injectable, ErrorHandler} from '@angular/core'
import * as Sentry from '@sentry/browser'
import { RewriteFrames } from '@sentry/integrations'
import { environment } from 'src/environments/environment';

@Injectable()
export class SentryErrorHandler implements ErrorHandler {

  constructor() {
    // Sentry.init({
    //   dsn: 'https://53712ca3c4c6455f84cedd1ea7e31f54@o4504501784739840.ingest.sentry.io/4504501786902528',
    //   integrations: [
    //     new RewriteFrames(),
    //   ],
    // })
  }

  handleError(error: { originalError: any; }) {
    // if(environment.production){
      // Sentry.captureException(error.originalError || error);
    // }else{
      console.error(error)
    // }
  }
}
