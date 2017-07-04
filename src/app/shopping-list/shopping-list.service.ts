
import {Ingredient} from '../shared/ingredients.model';
import {Subject} from 'rxjs/Subject';
export class ShoppingListService {


	ingredientChanged = new Subject<Ingredient[]>();
	startedEditing = new Subject<number>();

	private ingredients:Ingredient[] = [
		new Ingredient('rice',30), new Ingredient('wheat', 25), new Ingredient('beans', 40)
	];

	getIngredients() {

		return this.ingredients.slice();
	}

	getIngredient(index:number){
		//console.log('returning: ' + this.ingredients[index].amt);
		return this.ingredients[index];
	}

	insertNewIngredient(ingr:Ingredient){
		//console.log('received new ingr: '+ ingr.name);
		this.ingredients.push(ingr);
		this.ingredientChanged.next(this.ingredients.slice()); //this needs to be emitted because 
		//the components get only a copy of the private ingredients array. So whenever the ingredients array
		// array is updated an event needs to be emitted, which the consuming component will listen to and update
		//its own ingredients property; upgraded to using observables

	}

	updateIngredient(updatedIngr:Ingredient, index:number) {

		this.ingredients[index] = updatedIngr
		this.ingredientChanged.next(this.ingredients.slice());
			
	}

	deleteIngredient(index:number) {

		this.ingredients.splice(index,1);
		this.ingredientChanged.next(this.ingredients.slice());
	}
}