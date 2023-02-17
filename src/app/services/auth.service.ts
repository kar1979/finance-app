import { Injectable } from '@angular/core';
import "firebase/firestore";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import * as authActions from "../auth/auth.actions";
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  tempSubsciption!: Subscription;

  constructor(
    private auth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private store: Store<AppState>
  ) { }

  initAuthListener() {
    this.auth.authState.subscribe(user => {
      console.log('USER?', user);
      if (user) {
        this.tempSubsciption = this.fireStore.doc(`${ user.uid }/user`).valueChanges().subscribe( (fsUser: any) => {
          console.log('fsUser', fsUser);
          const user = User.fromFirebase(fsUser)
          this.store.dispatch( authActions.loginUser( { user } ) );
        });
      } else {
        this.store.dispatch( authActions.logoutUser() );
        this.tempSubsciption.unsubscribe();
      }
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

  loginUser(email: string, password: string) {
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
