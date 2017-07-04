import { Component, OnInit, OnDestroy} from '@angular/core';
import {Ingredient} from '../shared/ingredients.model';
import {ShoppingListService} from './shopping-list.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  
})

export class ShoppingListComponent implements OnInit, OnDestroy {
	ingredients: Ingredient[];
  private subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) { 
  		
  }

  ngOnInit() {
  	this.ingredients=this.shoppingListService.getIngredients();
  	
  	this.subscription = this.shoppingListService.ingredientChanged
  		.subscribe((ingr:Ingredient[])=>{this.ingredients = ingr; })
  	
  }

  ngOnDestroy(){

      this.subscription.unsubscribe();
  }

  //this works too. But according to Max, it involves too many calls to ngDoCheck
  // ngDoCheck() {
  		
  // 		this.ingredients=this.shoppingListService.getIngredients();
  // 		// this step is required because we are getting only a copy of the ingredients array from the service in ngOnInit. 
  // 		// When that array is updated with new content, we have to re-bind to the property again in ngDoCheck
  // }

  onEditItem(indexIngr:number) {
     // console.log('sending ingredient index: ' + indexIngr);
      this.shoppingListService.startedEditing.next(indexIngr);
  }
}
