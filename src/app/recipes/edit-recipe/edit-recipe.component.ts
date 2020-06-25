import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../../services/recipes.service';
import { Ingredient } from 'src/app/common/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {

  recipe: Recipe = {name:"new recipe", ingredients: [], description: "", imgPath: ""} // = this.recipesService.recipes[0];
  editMode:boolean = false;

  constructor(
    private recipesService: RecipesService,
    private shoppingListService: ShoppingListService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (!!params.id) {
        this.editMode = true;
        this.recipe = this.recipesService.getRecipe(+params.id)
      };
    });
  }

  addIngredientToList() {
    this.recipe.ingredients.map((ingredient: Ingredient) => {
      this.shoppingListService.addIngredient(ingredient);
    });
  }

}
