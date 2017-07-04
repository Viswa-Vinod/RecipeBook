import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 	// menuLoaded = 'recipe'

 	// onFeatureClicked(feature:string) {
 	// 	console.log('in FeatureClicked handler')
 	// 	// this.shoppingMenu = false;
 	// 	// this.menuLoaded = feature;

 	// }

 	ngOnInit() {
 		firebase.initializeApp({

 			apiKey: "AIzaSyAKtLLc1CQctViwe2N652hll5FYSbsEYKQ",
    		authDomain: "angularrecipe-b77aa.firebaseapp.com"
 		});

 	}

 	
}
