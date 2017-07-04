//import {EventEmitter} from '@angular/core'; upgraded to using observables
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredients.model';
import {Subject} from 'rxjs/Subject';
import {Injectable} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';

@Injectable()
export class RecipeService {

	recipesChanged = new Subject<Recipe[]>();


	//recipeSelected = new EventEmitter<Recipe>(); upgraded to using observables
	private recipes:Recipe[] = [

		new Recipe('Test1 Recipe', 
					'simply testing1', 
					'http://i.ndtvimg.com/i/2015-01/teekha-murgh_625x350_41421325402.jpg',
					[new Ingredient('rice1', 30), new Ingredient('wheat1', 40)]),
		new Recipe( 'Test2 Recipe', 
					'simply testing2', 
					'http://i.ndtvimg.com/i/2015-01/teekha-murgh_625x350_41421325402.jpg',
					[new Ingredient('rice2', 30), new Ingredient('wheat2', 40)]),
		new Recipe('Test3 Recipe', 
					'simply testing3', 
					'http://i.ndtvimg.com/i/2015-01/teekha-murgh_625x350_41421325402.jpg',
					[new Ingredient('rice3', 30), new Ingredient('wheat3', 40)]),
		new Recipe('Test4 Recipe', 
					'simply testing4', 
					'http://i.ndtvimg.com/i/2015-01/teekha-murgh_625x350_41421325402.jpg',
					[new Ingredient('rice4', 30), new Ingredient('wheat4', 40)])

	];


	setRecipes(recipes:Recipe[]){

		this.recipes=recipes;
		this.recipesChanged.next(this.recipes.slice());
	}
	getRecipes() {

		return this.recipes.slice(); //returns a copy of recipes array; to prevent direct changes to the private recipes property anywhere in the applicaiton that calls getRecipe()
	}

	getRecipe(id) {

		return this.recipes[id];
	}

	addRecipe(newRecipe:Recipe) {

		console.log(newRecipe);
		this.recipes.push(newRecipe);
		console.log(newRecipe.ingredients);
		this.recipesChanged.next(this.recipes.slice());


	}

	updateRecipe(index:number, updatedRecipe:Recipe) {

		this.recipes[index] = updatedRecipe;
		this.recipesChanged.next(this.recipes.slice());
	}

	deleteRecipe(index:number) {

		this.recipes.splice(index,1);
		this.recipesChanged.next(this.recipes.slice());
	}
}