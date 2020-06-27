import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../../services/recipes.service';
import { Ingredient } from 'src/app/common/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

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
    private recipesService: RecipesService,
    private shoppingListService: ShoppingListService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (!!params.id) {
        this.id = params.id;
        this.editMode = true;
        this.recipe = this.recipesService.getRecipe(+params.id);
      }
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

  deletingIngredientsFromRecipe(index: number){
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
    const { name, description, imgPath, ingredients } = this.recipe;
    const recipeIngredients = new FormArray([]);

    if (ingredients.length === 0) {
      recipeIngredients.push(
        new FormGroup({
          name: new FormControl(null, Validators.required),
          amount: new FormControl(1, [
            Validators.required,
            Validators.pattern(/^[1-9]+[0-9]*$/),
          ]),
        })

      );
    }

    ingredients.map((ingredient) =>
      recipeIngredients.push(
        new FormGroup({
          name: new FormControl(ingredient.name, Validators.required),
          amount: new FormControl(ingredient.amount, [
            Validators.required,
            Validators.pattern(/^[1-9]+[0-9]*$/),
          ]),
        })
      )
    );

    this.recipeForm = new FormGroup({
      name: new FormControl(name, [Validators.required]),
      description: new FormControl(description, [Validators.required]),
      imgPath: new FormControl(imgPath, [Validators.required]),
      ingredients: recipeIngredients,
    });
  }
}
