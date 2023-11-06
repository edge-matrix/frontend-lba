// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appUrl: 'https://dev.letsbunkagain.com/',
  baseUrl: 'https://dev.letsbunkagain.com/backend/api',
  storage: 'https://dev.letsbunkagain.com/backend/storage/',
  redirectUrl: 'https://dev.letsbunkagain.com/login',
  GoogleCaptchaKey: '6LftGB4jAAAAAGLknjW4C5iBBPxcclUv6BfhXm6J',
  Google_client_id: '997443453271-0cqbcm3icjuglbl8cg7nld72jqq40suv.apps.googleusercontent.com',
  Google_map_api: 'AIzaSyBcGxO02ZpNo6DHzALYUToWpTXolnmrO14',
  firebaseConfig: {
    apiKey: "AIzaSyA8ZWTbb3M4uWImzkd6ToE4Vj5P-aNQ3To",
    authDomain: "lets-bunk-again-com.firebaseapp.com",
    projectId: "lets-bunk-again-com",
    storageBucket: "lets-bunk-again-com.appspot.com",
    messagingSenderId: "347467439723",
    appId: "1:347467439723:web:3d9fbf8a128b56b55d1b2e",
    measurementId: "G-WCQ5LJLX8S"
  },
  // paymentUrl: 'https://mercury-uat.phonepe.com/transact/simulator',
  paymentUrl: 'https://www.instamojo.com/@lets_bunk_again/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
