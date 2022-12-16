import Config from "../../config"
import type {
  FirebaseConfig,
  FirebaseToken,
  FirebaseError
} from "./firebase.types"
import { initializeApp } from "firebase/app"
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

/**
 * Manages all requests to the Firebase. You can use this class to build out
 * various requests that you need to call from your backend Firebase.
 */
export class FirebaseAuth {
  config: FirebaseConfig;
  app;
  auth;


  /**
   * Set up our Firebase instance. Keep this lightweight!
   */
  constructor() {
    this.config = Config.FIREBASE;
    this.app = initializeApp(this.config);
    this.auth = getAuth(this.app);
  }

  async login(email: string, password: string): Promise<FirebaseToken | FirebaseError> {
    return new Promise( (resolve) => {signInWithEmailAndPassword(this.auth, email, password)
      .then( (userCredential: any) => {
        const auth: FirebaseToken = { token: userCredential._tokenResponse.idToken }
        resolve(auth)
      }).catch( (error) => {
        const errorAuth: FirebaseError = { error: error.message }
        resolve(errorAuth)
      })
    })
  }

  async createUser(email: string, password: string): Promise<any>{
    return new Promise( (resolve) => {
      createUserWithEmailAndPassword(this.auth, email, password).then( (user) => {
        resolve(user);
      }).catch( (error) => {
        const errorAuth: FirebaseError = { error: error.message}
        resolve(errorAuth)
      })
    });
  }
}

// Singleton instance of the Firebase for convenience
export const FirebaseServices = new FirebaseAuth()
