import { firebaseConfig } from '../config/config';
import firebase from 'firebase';
import { AuthServiceInterface } from '../types/service-interfaces';
import { AUTH_EMULATOR_URL } from '../config/constants';

export default class FirebaseAuthService implements AuthServiceInterface {
  _auth: firebase.auth.Auth;
  constructor() {
    const app = !firebase.apps.length
      ? firebase.initializeApp(firebaseConfig)
      : firebase.app();
    const auth = app.auth();

    if (process.env.NODE_ENV !== 'production') {
      auth.useEmulator(AUTH_EMULATOR_URL);
    }

    this._auth = auth;
  }

  async login(email: string, password: string) {
    await this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.auth.signOut();
  }

  get auth(): firebase.auth.Auth {
    return this._auth;
  }

  set auth(auth: firebase.auth.Auth) {
    this._auth = auth;
  }
}
