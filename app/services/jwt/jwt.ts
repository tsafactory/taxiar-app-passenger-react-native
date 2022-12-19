import Config from "../../config"
import type {
  JwtConfig,
} from "./jwt.types"
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";
import { DatabaseService } from "../database";
// eslint-disable-next-line camelcase
import jwt_decode from "jwt-decode";


/**
 * Manages all requests to the Firebase. You can use this class to build out
 * various requests that you need to call from your backend Firebase.
 */
export class JwtAuth {
  config: JwtConfig;
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

  decodeToken(){
    const token = DatabaseService.get('token');
    if(!token){
      return
    }
    return jwt_decode(token);
  }

  isValidToken(){
    const token = DatabaseService.get('token');
    if(!token){
      return
    }

    const jwtData = jwt_decode(token);
    console.log(jwtData);

  }
}

// Singleton instance of the Firebase for convenience
export const JwtServices = new JwtAuth()
