import { Component, OnInit } from '@angular/core';

import {RecipeService} from './recipe.service';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  
})

export class RecipesComponent implements OnInit {
	//selectedRecipe: Recipe; upgraded to using observables

  constructor() { }

  ngOnInit() {

    // this.recipeService.recipeSelected
    //   .subscribe((recipe:Recipe)=>{

    //     this.selectedRecipe = recipe;
    //     console.log('you have a recipe selected: ' + this.selectedRecipe.id)
    //   });

    
    // ;

  }
}
