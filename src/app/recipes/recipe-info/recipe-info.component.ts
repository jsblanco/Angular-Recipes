import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../../services/recipes.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions'

@Component({
  selector: 'app-recipe-info',
  templateUrl: './recipe-info.component.html',
  styleUrls: ['./recipe-info.component.css'],
})
export class RecipeInfoComponent implements OnInit {
  id:number
  recipe: Recipe; // = this.recipesService.recipes[0];

  constructor(
    private recipesService: RecipesService,
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id
      this.recipe = this.recipesService.getRecipe(+params.id);
    });
  }

  addIngredientToList() {
    this.store.dispatch(ShoppingListActions.AddIngredients(this.recipe.ingredients))

  }

  deleteIngredient(){
    this.recipesService.deleteRecipe(this.id);
    this.router.navigate([".."], {relativeTo: this.route})
  }
}
