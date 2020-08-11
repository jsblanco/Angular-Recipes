import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';

import { environment } from './../../../environments/environment';
import { Recipe } from './../recipe.model'
import * as RecipesActions from './recipe.actions';

@Injectable()
export class RecipeEffects {
    private baseUrl = environment.baseUrl;

    @Effect()
    fetchRecipes = this.action$.pipe(
        ofType(RecipesActions.FETCH_RECIPES),
        switchMap(()=>{
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
      map(recipes => new RecipesActions.SetRecipes(recipes) )

    )

    constructor(
        private http: HttpClient,
        private action$: Actions,
        ){}

}