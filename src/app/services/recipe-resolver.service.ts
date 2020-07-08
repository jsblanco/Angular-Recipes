import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { RecipeStorageService } from './recipe-storage.service'
import { Recipe } from '../recipes/recipe.model';
import { RecipesService } from './recipes.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]> {

  constructor(private recipeStorageService: RecipeStorageService, private recipesService: RecipesService ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const recipes = this.recipesService.getRecipes();

    if (recipes.length === 0) {
      return this.recipeStorageService.getStoredRecipes();
    } 
    
  }

}
