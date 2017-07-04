import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthService {

	token:string;

	constructor(private router:Router){}

	signupUser(email:string, password:string) {

		firebase.auth().createUserWithEmailAndPassword(email, password)
			.catch(

					error => console.log(error)
				)
	}

	signinUser(email:string, password:string) {

		firebase.auth().signInWithEmailAndPassword
		(email, password)
			.then(
					response => {
						this.router.navigate(['/']);
						//console.log(response)
						firebase.auth().currentUser.getToken()
						.then(
								(token:string)=> this.token = token
							)
					}
				)
			.catch(
					error => console.log(error)
				)
	}

	getToken() {
		firebase.auth().currentUser.getToken()
				.then(
					(token:string) => this.token = token
					)
		return this.token;
	}

	isAuthenticated() {

		let user = firebase.auth().currentUser;

		if (user) {
		  return true;
		} else {
		  return this.token != null; 
		}
		
	}

	logout() {
		console.log('logging out...');
		firebase.auth().signOut();
		this.token=null;
	}
}