import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { map, tap, } from 'rxjs/operators';

import { RecipesService } from './recipes.service';
import { Recipe } from '../recipes/recipe.model';
import * as fromRoot from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipe.actions';
//import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeStorageService {
  private baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private recipesService: RecipesService,
    private store: Store<fromRoot.AppState>
    //private auth: AuthService
  ) {}

  getStoredRecipes() {
    return this.http.get<Recipe[]>(this.baseUrl).pipe(
      map((recipes: Recipe[]) =>
        recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        })
      ),
      tap((recipes: Recipe[]) => {
        this.store.dispatch(new RecipesActions.SetRecipes(recipes))
        //this.recipesService.setRecipeList(recipes);
      })
    );
  }

  storeRecipes() {
    const recipes = this.recipesService.getRecipes();
    this.http
      .put(this.baseUrl, recipes)
      .subscribe((response: Recipe[]) => console.log(response));
  }
}
