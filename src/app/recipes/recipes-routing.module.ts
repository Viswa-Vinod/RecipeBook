
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RecipeStartComponent} from './recipe-start/recipe-start.component';
import {RecipeListComponent} from './recipe-list/recipe-list.component';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RecipesComponent} from './recipes.component';
import {AuthGuard} from '../auth/auth-guard.service';

const recipesRoutes: Routes = [

	{path: '', component: RecipesComponent, children:[
  		{path:'', component:RecipeStartComponent},
  		{path:'new', component:RecipeEditComponent, canActivate: [AuthGuard]},
  		{path:':id',component:RecipeDetailComponent},
  		{path:':id/edit', component:RecipeEditComponent, canActivate: [AuthGuard]},
  	]}
]
@NgModule({

	imports: [RouterModule.forChild(recipesRoutes)],
	providers: [AuthGuard],
	exports: [RouterModule]
})
export class RecipesRoutingModule {

}