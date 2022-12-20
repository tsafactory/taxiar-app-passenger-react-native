export interface FirebaseConfig {
  appId: string;
  measurementId: string;
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
}

export interface FirebaseToken {
  token: string
}


export interface FirebaseError{
  error: string
}