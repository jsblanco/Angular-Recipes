import { Component, Output, EventEmitter } from '@angular/core';
import { Ingredient } from "../../common/ingredient.model"
@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent {
@Output() newIngredient = new EventEmitter<Ingredient>()
@Output() resetList = new EventEmitter<void>()

  constructor() { }

  onAddIngredient(nameInput:HTMLInputElement, amountInput: HTMLInputElement){
    this.newIngredient.emit({name: nameInput.value.trim(), amount: +amountInput.value})
  }

  onResetList(){
    this.resetList.emit()
  }
}
