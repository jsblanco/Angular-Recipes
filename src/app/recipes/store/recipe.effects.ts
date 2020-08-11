import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';

import { environment } from './../../../environments/environment';
import { Recipe } from './../recipe.model';
import * as fromRoot from '../../store/app.reducer';
import * as RecipesActions from './recipe.actions';

@Injectable()
export class RecipeEffects {
  private baseUrl = environment.baseUrl;

  @Effect()
  fetchRecipes = this.action$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>(this.baseUrl)
    }),
    map((recipes: Recipe[]) =>
      recipes.map((recipe) => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : [],
        };
      })
    ),
    map(recipes => new RecipesActions.SetRecipes(recipes))
  )

  @Effect({dispatch:false})
  storeRecipes = this.action$.pipe(
    ofType(RecipesActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap( ([actionData, recipesState]) => {
      return this.http.put(this.baseUrl, recipesState.recipes)
    })
  )

  constructor(
    private http: HttpClient,
    private action$: Actions,
    private store: Store<fromRoot.AppState>
  ) { }

}