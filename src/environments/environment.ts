// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // API_URL: 'http://backend.startdental.es:5862'
  // API_URL: 'https://backend.startdental.es'
  API_URL: 'http://localhost:5862',
  // URL API REST wp.
  API_URL_JWT_WP: 'https://startdental.es/wp-json/jwt-auth/v1/token', //para crear nuevos usuarios.
  API_URL_WP: 'https://startdental.es/wp-json/wp/v2', //End points API.
  username: 'Truevalue',
  password: 'DffgyRJ2XEJyDfl%zNU8T^nu'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
