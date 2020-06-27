import { Injectable } from '@angular/core';
import { Ingredient } from '../common/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  listChanged = new Subject<Ingredient[]>();
  startedEditing= new Subject<number>()
  ingredients: Ingredient[] = [
    new Ingredient('Ajos', 3),
    new Ingredient('Cebollas', 2),
    new Ingredient('Tomates', 4),
    new Ingredient('Pimientos', 1),
  ];

  constructor() {}

  getIngredients() {
    return [...this.ingredients];
  }

  getIngredient(index:number){
    return this.ingredients[index];
  }

  addIngredient(newIngredient: Ingredient) {
    if (!newIngredient.name) return;
    let ingredientIndex = this.ingredients.findIndex(
      (ingredient) =>
        ingredient.name.toLowerCase() === newIngredient.name.toLowerCase()
    );
    ingredientIndex === -1
      ? this.ingredients.push(newIngredient)
      : (this.ingredients[ingredientIndex].amount += newIngredient.amount);

    this.listChanged.next([...this.ingredients]);
  }

  updateIngredient(index: number, ingredient: Ingredient){
    this.ingredients[index]=ingredient;
    this.listChanged.next([...this.ingredients])
  }

  deleteIngredient(index: number){
    this.ingredients.splice(index,1);
    this.listChanged.next([...this.ingredients])
  }


  emptyShoppingList() {
    this.ingredients.length = 0;
    this.listChanged.next([...this.ingredients]);
  }
}
