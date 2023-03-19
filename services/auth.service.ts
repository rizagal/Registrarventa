import { Injectable } from '@angular/core';
import { getAuth, sendEmailVerification } from "firebase/auth";
import {
	Auth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut
} from '@angular/fire/auth';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor(private auth: Auth) {}

	async register({ email, password }) {
		try {
			const user = await createUserWithEmailAndPassword(this.auth, email, password);
			const auth = getAuth();	
			return user;
			
		} catch (e) {
			return null;
		}
	}

	async login({ email, password }) {
		try {
			const user = await signInWithEmailAndPassword(this.auth, email, password);			
			return user;
			
		} catch (e) {
			return null;
		}
	}

	logout() {
		return signOut(this.auth);
	}
}