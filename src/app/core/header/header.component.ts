import {Component} from '@angular/core';
import { DataStorageService} from '../../shared/data-storage.service';
import {Response} from '@angular/http';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html'
})

export class HeaderComponent {
	
	
	constructor(private dataStorageService: DataStorageService,
				private router:Router, private authSvc:AuthService){}

	onSaveData() {
		this.dataStorageService.storeRecipes().subscribe(
				(response:Response)=>{console.log(response)}
			);

	}

	onGetData() {

		this.dataStorageService.getRecipes();
	}

	onLogout() {
		//console.log('in Logout');
		this.authSvc.logout();
		this.router.navigate(['/recipes']);

	}

	isAuthenticated() {
    return this.authSvc.isAuthenticated();
  	}


}