import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { RecipesService } from './recipes.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RecipeStorageService {
  private baseUrl =
    'https://angular-recipes-course.firebaseio.com/recipes.json';

  constructor(
    private http: HttpClient,
    private recipesService: RecipesService
  ) {}

  getStoredRecipes() {
    return this.http.get(this.baseUrl).pipe(
      map(
        (recipes: Recipe[]) =>
          recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          })
          ),
          tap((recipes: Recipe[]) => {
            console.log(recipes)
            this.recipesService.setRecipeList(recipes)})
    );
  }

  storeRecipes() {
    const recipes = this.recipesService.getRecipes();
    this.http
      .put(this.baseUrl, recipes)
      .subscribe((response: Recipe[]) => console.log(response));
  }
}
