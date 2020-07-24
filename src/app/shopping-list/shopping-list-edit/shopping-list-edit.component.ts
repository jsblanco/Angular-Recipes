import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ShoppingListService } from '../../services/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../common/ingredient.model';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions'
import * as fromShoppingList from '../store/shopping-list.reducer'
@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css'],
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') shoppingListForm: NgForm;
  ingredientEditSubscription: Subscription;
  edit = false;
  edittedIngredientIndex: number;
  edittedIngredient: Ingredient;

  constructor(private shoppingListService: ShoppingListService, private store: Store<fromShoppingList.AppState>) {}

  ngOnInit() {


    this.ingredientEditSubscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.edit = true;
        this.edittedIngredientIndex = index;
        this.edittedIngredient = this.shoppingListService.getIngredient(index);
        this.shoppingListForm.setValue({
          name: this.edittedIngredient.name,
          amount: this.edittedIngredient.amount,
        });
      }
    );
  }

  ngOnDestroy() {
    this.ingredientEditSubscription.unsubscribe();
  }

  addIngredient(form: NgForm) {
    const ingredient = {
      name: form.value.name,
      amount: +form.value.amount,
    };
    this.edit
      ? this.store.dispatch(ShoppingListActions.UpdateIngredient({index: this.edittedIngredientIndex, updatedIngredient: ingredient}))//this.shoppingListService.updateIngredient(this.edittedIngredientIndex,ingredient)
      : this.store.dispatch(ShoppingListActions.AddIngredient(ingredient))//this.shoppingListService.addIngredient(ingredient);
    this.emptyForm();
  }

  deleteItem() {
    this.store.dispatch(ShoppingListActions.DeleteIngredient(this.edittedIngredientIndex));
    //this.shoppingListService.deleteIngredient(this.edittedIngredientIndex);
    this.emptyForm();
  }

  emptyForm() {
    this.shoppingListForm.setValue({
      name: '',
      amount: 1,
    });
    this.edit = false;
    this.edittedIngredient = undefined;
    this.edittedIngredientIndex = undefined;
  }


  emptyShoppingList() {
    this.shoppingListService.emptyShoppingList();
  }
}
