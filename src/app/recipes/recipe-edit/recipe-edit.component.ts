import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {RecipeService} from '../recipe.service';
import {Recipe} from '../recipe.model';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
	id:number;
	editMode: boolean = false;
	
  recipeForm:FormGroup;
  ingrs:FormArray = new FormArray([]);
  
  constructor(private route:ActivatedRoute, private recipeSvc:RecipeService, private router:Router) { }

  ngOnInit() {

  		this.route.params.subscribe(

  				(params: Params)=>{this.id = +params['id'];
  					//console.log('recipe to edit is: ' + this.id)
  					this.editMode = params['id']!=null;
            this.initForm();
  					
  					}
  		)
  }

  onAddIngredient() {
    

    (<FormArray>this.recipeForm.get('ingredients')).push(
          new FormGroup(
              {
                  'name': new FormControl(null, Validators.required),
                  'amt': new FormControl(null, [Validators.required, 
                  Validators.pattern(/^[1-9]+[0-9]*$/)])

              })
        )
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  
  private initForm() {
    let recipeName = '';
    let recipeImgPath = '';
    let recipeDesc = '';
    

    if(this.editMode) {
        const recipe = this.recipeSvc.getRecipe(this.id);
        recipeName = recipe.name;
        recipeImgPath = recipe.imgPath;
        recipeDesc = recipe.desc;

        if(recipe['ingredients']) {

          for(let ingr of recipe.ingredients) {

            this.ingrs.push(new FormGroup({
                'name': new FormControl(ingr.name, Validators.required),
                'amt': new FormControl(ingr.amt, [Validators.required, 
                  Validators.pattern(/^[1-9]+[0-9]*$/)])
              }))
          }
        }

    }
      this.recipeForm = new FormGroup({

        'name': new FormControl(recipeName, Validators.required),
        'imgPath': new FormControl(recipeImgPath, Validators.required),
        'desc': new FormControl(recipeDesc, Validators.required),
        'ingredients': this.ingrs


      })
  }

  onSubmit() {
    // const updatedRecipe: Recipe = new Recipe(
    //     this.recipeForm.value['name'], 
        
    //     this.recipeForm.value['desc'],
    //     this.recipeForm.value['imgPath'],
    //     this.recipeForm.value['ingredients']
    //   )

    //console.log(this.recipeForm.value);

    if (this.editMode) {
      this.recipeSvc.updateRecipe(this.id, this.recipeForm.value);
    } else {

      this.recipeSvc.addRecipe(this.recipeForm.value);
    }

    this.onCancel();
  }


  onCancel() {
      this.router.navigate(['../'], {relativeTo: this.route });
  }

  onDeleteIngr(indexCtrl: number){

      (<FormArray>this.recipeForm.get('ingredients')).removeAt(indexCtrl);

  }

}
