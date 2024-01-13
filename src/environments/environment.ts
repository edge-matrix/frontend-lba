// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appUrl: 'http://localhost:4200/',
  baseUrl: 'http://127.0.0.1:8000/api',
  storage: 'http://127.0.0.1:8000/storage/',
  redirectUrl: 'http://localhost:4200/login',
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
  // paymentUrl: 'https://mercury-t2.phonepe.com/transact/pg',   //Phone Pay Prod
  // paymentUrl: 'https://mercury-uat.phonepe.com/transact/simulator', //Phone Pay Demo
  // paymentUrl: 'https://www.instamojo.com/@lets_bunk_again/', // Insta Mojo Prod
  //paymentUrl: 'https://test.instamojo.com/@edgematrixtechnologies/', // Insta Mojo Test
  pusher: '5bdb30b6e88270a5117a',

  EncryptKey: 'bbZMZJWf90AhF9tOeJSQ0XOrIaFlsB8b4G1BLflovY4=',
  EncryptIV: 'AES-256-CBC'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
