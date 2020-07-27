import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../common/ingredient.model';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions'
import * as fromRoot from '../store/app.reducer'
//import { ShoppingListService } from './shopping-list.service';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  recipesChanged = new Subject<Recipe[]>();
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Gazpacho',
  //     'Sopa de tomate fresquita para el verano',
  //     'https://www.comedera.com/wp-content/uploads/2015/06/gazpacho.jpg',
  //     [
  //       new Ingredient('Tomates', 3),
  //       new Ingredient('Pimientos', 1),
  //       new Ingredient('Panes', 2),
  //     ]
  //   ),
  //   new Recipe(
  //     'Fabada',
  //     'Plato de cuchara mítico asturiano',
  //     'https://www.turismoasturias.es/documents/11022/62857/CasaChema_Fabada_1.jpg?t=1389288544723',
  //     [
  //       new Ingredient('Fabas', 5),
  //       new Ingredient('Chorizo', 2),
  //       new Ingredient('Morcilla', 2),
  //     ]
  //   ),
  //   new Recipe(
  //     'Carrillera',
  //     'Manjar de dioses no apto para veganos',
  //     'https://www.hogarmania.com/archivos/201105/652-menestra-de-carrilleras-de-ternera-xl-668x400x80xX.jpg',
  //     [
  //       new Ingredient('Carrilleras', 3),
  //       new Ingredient('Pimienta', 1),
  //       new Ingredient('Patatas', 2),
  //     ]
  //   ),
  //   new Recipe(
  //     'Callos',
  //     'Nunca algo tan asqueroso estuvo tan bueno',
  //     'https://t2.uc.ltmcdn.com/images/0/8/6/img_como_hacer_callos_a_la_madrilena_6680_600.jpg',
  //     [
  //       new Ingredient('Callos', 6),
  //       new Ingredient('Pimentón', 1),
  //       new Ingredient('Panes', 3),
  //     ]
  //   ),
  //   new Recipe(
  //     'Lentejas',
  //     'O las tomas o las dejas',
  //     'https://www.comedera.com/wp-content/uploads/2014/04/receta-de-lentejas-con-chorizo-1.jpg',
  //     [
  //       new Ingredient('Lentejas', 5),
  //       new Ingredient('Chorizo', 2),
  //       new Ingredient('Pimentón', 2),
  //     ]
  //   ),
  //   new Recipe(
  //     'Cocido',
  //     'De Madrid al cielo',
  //     'https://www.avilaautentica.es//images/recetas/xcocido_sanjuaniego.jpg.pagespeed.ic.16XjfJ3Y6A.jpg',
  //     [
  //       new Ingredient('Garbanzos', 3),
  //       new Ingredient('Chorizo', 1),
  //       new Ingredient('Morcillo', 2),
  //     ]
  //   ),
  // ];
  private recipes: Recipe[] = [];

  selectedRecipe = new Subject<Recipe>();

  constructor(
    //private ShoppingListService: ShoppingListService,
    private store: Store<fromRoot.AppState>
  ) { }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipeList(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  buyIngredients(ingredients: Ingredient[]) {
    this.store.dispatch(ShoppingListActions.AddIngredients(ingredients));
    //ingredients.map(ingredient=> this.ShoppingListService.addIngredient(ingredient))

  }
}
