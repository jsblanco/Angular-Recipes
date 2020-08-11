import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';

import { Recipe } from '../recipe.model';
import { RecipesService } from '../../services/recipes.service';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions'
import * as fromRoot from '../../store/app.reducer'
import * as RecipesActions from '../store/recipe.actions'

@Component({
  selector: 'app-recipe-info',
  templateUrl: './recipe-info.component.html',
  styleUrls: ['./recipe-info.component.css'],
})
export class RecipeInfoComponent implements OnInit {
  id: number
  recipe: Recipe; // = this.recipesService.recipes[0];

  constructor(
    private store: Store<fromRoot.AppState>,
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params
      .pipe(
        map(params => +params.id),
        switchMap(id => {
          this.id = +id;
          return this.store.select('recipes')
        }),
        map(
          (recipesState: { recipes: Recipe[] }) => {
            return recipesState.recipes.find((recipe, index) => index === this.id);
          })
      )
      .subscribe(recipe => this.recipe = recipe)

    // .subscribe(
    //   (params: Params) => {
    //     this.id = +params.id
    //     this.recipe = this.recipesService.getRecipe(+params.id);
    //   });
  }

  addIngredientToList() {
    this.store.dispatch(ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  deleteIngredient() {
    //this.recipesService.deleteRecipe(this.id);
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.id));
    this.router.navigate([".."], { relativeTo: this.route });
  }
}
