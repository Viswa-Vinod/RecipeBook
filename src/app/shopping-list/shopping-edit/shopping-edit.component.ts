import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredients.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  subscription:Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  @ViewChild('f') slForm:NgForm;
	 	 
  
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
      this.subscription = this.shoppingListService.startedEditing.subscribe(
        (index:number) => {
          this.editedItemIndex = index;
          this.editMode=true;
          this.editedItem = this.shoppingListService.getIngredient(index);
          //console.log('received selected ingredient: ' + this.editedItem.name);
          this.slForm.setValue({
              'name': this.editedItem.name,
              'amount': this.editedItem.amt
          })
        }
      );        
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(form:NgForm){
    const value = form.value;
  	const newIngredient = new Ingredient(value.name, value.amount);
  	//this.shoppingListService.addNewIngredient.emit(newIngredient)

    if (this.editMode){
        this.shoppingListService.updateIngredient(newIngredient, this.editedItemIndex);

    } else {
      this.shoppingListService.insertNewIngredient(newIngredient);
    };
    
    this.editMode=false;
  	form.reset();
  }

  onClear() {

    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {

     this.shoppingListService.deleteIngredient(this.editedItemIndex);
     this.onClear();
  }
}
