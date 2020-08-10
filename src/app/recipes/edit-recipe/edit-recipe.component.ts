import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { map } from 'rxjs/operators'
import { Store } from '@ngrx/store';

import { Recipe } from '../recipe.model';
import { RecipesService } from '../../services/recipes.service';
import { Ingredient } from 'src/app/common/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import * as fromRoot from '../../store/app.reducer'

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css'],
})
export class EditRecipeComponent implements OnInit {
  recipe: Recipe = {
    name: 'New recipe',
    ingredients: [],
    description: '',
    imgPath: '',
  };
  editMode: boolean = false;
  recipeForm: FormGroup;
  id: number;

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  constructor(
    private store: Store<fromRoot.AppState>,
    private recipesService: RecipesService,
    private shoppingListService: ShoppingListService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.newForm();
    });
  }

  addIngredientToList() {
    this.recipe.ingredients.map((ingredient: Ingredient) => {
      this.shoppingListService.addIngredient(ingredient);
    });
  }

  addIngredientToRecipe() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  deletingIngredientsFromRecipe(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }

  onSubmit() {
    !!this.editMode
      ? this.recipesService.updateRecipe(this.id, this.recipeForm.value)
      : this.recipesService.addRecipe(this.recipeForm.value);
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  onCancel() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  private newForm() {
    let name, description, imgPath;
    name = description = imgPath = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      //const recipe = this.recipesService.getRecipe(this.id);
      this.store.select('recipes')
        .pipe(map((recipeState: { recipes: Recipe[] }) => {
          return recipeState.recipes.find((recipe, index) => index == this.id)
        }))
        .subscribe(recipe => {
          name = recipe.name;
          description = recipe.description;
          imgPath = recipe.imgPath;
          if (recipe['ingredients']) {
            for (let ingredient of recipe.ingredients) {
              recipeIngredients.push(
                new FormGroup({
                  name: new FormControl(ingredient.name, Validators.required),
                  amount: new FormControl(ingredient.amount, [
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/)
                  ])
                })
              );
            }
          }
        })
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(name, [Validators.required]),
      description: new FormControl(description, [Validators.required]),
      imgPath: new FormControl(imgPath, [Validators.required]),
      ingredients: recipeIngredients,
    });
  }

}
