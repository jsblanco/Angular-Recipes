import { Component } from '@angular/core';
import { ShoppingListService } from '../../services/shopping-list.service';
@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css'],
})
export class ShoppingListEditComponent {
  constructor(private shoppingListService: ShoppingListService) {}

  addIngredient(nameInput: HTMLInputElement, amountInput: HTMLInputElement) {
    this.shoppingListService.addIngredient({
      name: nameInput.value.trim(),
      amount: +amountInput.value,
    });
  }

  emptyShoppingList() {
    this.shoppingListService.emptyShoppingList();
  }
}
