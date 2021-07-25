import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/database'

const config={
    apiKey: "AIzaSyAhclVbXXbb8vc6Vq5D0Ze6YDEr0U8JzWM",
    authDomain: "chat-web-app-3aab7.firebaseapp.com",
    projectId: "chat-web-app-3aab7",
    storageBucket: "chat-web-app-3aab7.appspot.com",
    messagingSenderId: "1018446130309",
    appId: "1:1018446130309:web:33e3d8de27306be9364dec"
  };

  const app=firebase.initializeApp(config)

  export const auth=app.auth()
  export const database=app.database()