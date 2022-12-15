/**
 * These are configuration settings for the dev environment.
 *
 * Do not include API secrets in this file or anywhere in your JS.
 *
 * https://reactnative.dev/docs/security#storing-sensitive-info
 */
export default {
  API_URL: "https://api.rss2json.com/v1/",
  FIREBASE:{ appId: 'app-id',
            measurementId: 'G-measurement-id',
            apiKey: 'AIzaSyAmGFfhxPfuc3SkgSAnPDmZ4FmRK-vFnaM',
            authDomain: 'taxiarv2-test.firebaseapp.com',
            databaseURL: 'https://taxiarv2-test.firebaseio.com',
            projectId: 'taxiarv2-test',
            storageBucket: 'taxiarv2-test.appspot.com',
            messagingSenderId: '146819571451'
          }
}
