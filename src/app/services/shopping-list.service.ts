import { Injectable } from '@angular/core';
import { Ingredient } from '../common/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredients: Ingredient[] = [
    new Ingredient('Ajos', 3),
    new Ingredient('Cebollas', 2),
    new Ingredient('Tomates', 4),
    new Ingredient('Pimientos', 1),
  ];

  constructor() {}

  addIngredient(newIngredient: Ingredient) {
    if (!newIngredient.name) return;
    let ingredientIndex = this.ingredients.findIndex(
      (ingredient) =>
        ingredient.name.toLowerCase() === newIngredient.name.toLowerCase()
    );
    ingredientIndex === -1
      ? this.ingredients.push(newIngredient)
      : (this.ingredients[ingredientIndex].amount += newIngredient.amount);
  }

  emptyShoppingList() {
    this.ingredients.length = 0;
  }
}
