import { Injectable } from '@angular/core';
import "firebase/firestore";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth,
    private fireStore: AngularFirestore
  ) { }

  initAuthListener() {
    this.auth.authState.subscribe(user => {
      console.log('?', user);
    });
  }

  createUser(name: string, email: string, password: string) {
    console.log('Service - Data Register', {name, email, password});
    return this.auth.createUserWithEmailAndPassword(email, password).then(
      ({ user }) => {
        const newUser = new User( user!.uid, name, user!.email!);

        return this.fireStore.doc(`${ user!.uid }/user`).set({ ...newUser });
      }
    );
  }

  signinUser(email: string, password: string) {
    console.log('Service - Data SignIn', {email, password});
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map(user => user != null)
    );
  }
}
