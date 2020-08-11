import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, take, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { RecipeStorageService } from './recipe-storage.service'
import { Recipe } from '../recipes/recipe.model';
import { RecipesService } from './recipes.service';
import * as fromRoot from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipe.actions';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]> {

  constructor(
    private store: Store<fromRoot.AppState>,
    private action$: Actions,
    private recipesService: RecipesService
    //private recipeStorageService: RecipeStorageService, 
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('recipes').pipe(
      take(1),
      switchMap(recipesState => {
        if (recipesState==undefined || recipesState.recipes.length==0) {
          this.store.dispatch(new RecipesActions.FetchRecipes());
          return this.action$.pipe(
            ofType(RecipesActions.SET_RECIPES),
            take(1)
          );
        } else {
          return of(recipesState.recipes);
        }
      })
    )
    //const recipes = this.recipesService.getRecipes();
    //if (recipes.length === 0) return this.recipeStorageService.getStoredRecipes();
  }

}
