import { Component } from '@angular/core';
import { Ingredient } from '../common/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent {
  ingredients: Ingredient[] = [
    new Ingredient("Ajos",3),
    new Ingredient("Cebollas",2),
    new Ingredient("Tomates",4),
    new Ingredient("Pimientos",1)
  ];

  constructor() {}

  addIngredient(newIngredient: Ingredient){
    if (!newIngredient.name) return;
    let ingredientIndex = this.ingredients.findIndex(ingredient=> ingredient.name.toLowerCase()===newIngredient.name.toLowerCase());
    ingredientIndex ===-1
    ? this.ingredients.push(newIngredient)
    : this.ingredients[ingredientIndex].amount += newIngredient.amount;
  }
}
