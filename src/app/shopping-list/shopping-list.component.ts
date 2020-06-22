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
}
