export interface JwtConfig {
  appId: string;
  measurementId: string;
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
}

export interface JwtToken {
  token: string
}


export interface JwtError{
  error: string
}