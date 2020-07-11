import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { RecipesService } from './recipes.service';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeStorageService {
  private baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private recipesService: RecipesService,
    private auth: AuthService
  ) {}

  getStoredRecipes() {
    return this.auth.loggedUser.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.get<Recipe[]>(this.baseUrl, {
          params: new HttpParams().set('auth', user.token),
        });
      }),
      map((recipes: Recipe[]) =>
        recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        })
      ),
      tap((recipes: Recipe[]) => {
        this.recipesService.setRecipeList(recipes);
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
