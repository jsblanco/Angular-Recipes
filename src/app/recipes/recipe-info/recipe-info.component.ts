import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../../services/recipes.service';
import { Ingredient } from 'src/app/common/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-recipe-info',
  templateUrl: './recipe-info.component.html',
  styleUrls: ['./recipe-info.component.css'],
})
export class RecipeInfoComponent implements OnInit {
  recipe: Recipe = this.recipesService.recipes[0];

  constructor(private recipesService: RecipesService, private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.recipesService.selectedRecipe.subscribe((recipe: Recipe) => {
      this.recipe = recipe;
    });
  }

  addIngredientToList(){
    this.recipe.ingredients.map((ingredient: Ingredient)=>{
      this.shoppingListService.addIngredient(ingredient)
    })
  }

}
