import { Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {ShoppingListService} from '../../shopping-list/shopping-list.service';
import {Ingredient} from '../../shared/ingredients.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

	recipe:Recipe;
  id:number;
  constructor(private slService: ShoppingListService, private recipeService: RecipeService,
   private route:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    
    
    //this.id = +this.route.snapshot.params['id'];
    
      this.route.params.subscribe((params)=>{
      this.id = +params['id']; 
      //console.log('currently selected id: '+ this.id);
      this.recipe = this.recipeService.getRecipe(this.id);
      //console.log('recipe amt in recipe detail comp is: ' + this.recipe.ingredients[0].amt);
    });
       
  }

  addSl(ingrArr:Ingredient[]){
    for (var ingr of  ingrArr) {
  	  this.slService.insertNewIngredient(ingr);
    }
     
  }

  onDelete() {

    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}

// insertNewIngredient(ingr:Ingredient){
//     //console.log('received new ingr: '+ ingr.name);
//     this.ingredients.push(ingr);
//     this.ingredientChanged.next(this.ingredients.slice()); //thi