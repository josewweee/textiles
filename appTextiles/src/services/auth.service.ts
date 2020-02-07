import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth'
import * as firebase from 'firebase/app'

@Injectable()
export class AuthService{
    constructor(public afDB: AngularFireDatabase, public afAuth: AngularFireAuth){
                    
    }
    loginWithFacebook() {
        return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    }
    loginWithGoogle() {
        return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
    registerWithEmail(email, password) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    }
    loginWithEmail(email, password) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password);
    }    
    getStatus() {
        return this.afAuth.authState;
    }
    logout(){
        return this.afAuth.auth.signOut();
    }
}