import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ShoppingListService } from '../../services/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../common/ingredient.model';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions'
import * as fromApp from '../../store/app.reducer'
@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css'],
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') shoppingListForm: NgForm;
  edit = false;
  ingredientEditSubscription: Subscription;
  edittedIngredient: Ingredient;
  //edittedIngredientIndex: number;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {

    this.ingredientEditSubscription = this.store.select('shoppingList').subscribe(state => {
      if (state.editedIngredientIndex > -1) {
        this.edit = true;
        this.edittedIngredient = state.editedIngredient;
        this.shoppingListForm.setValue({
          name: this.edittedIngredient.name,
          amount: this.edittedIngredient.amount,
        });
      } else { this.edit = false }
    })

    // this.ingredientEditSubscription = this.shoppingListService.startedEditing.subscribe(
    //   (index: number) => {
    //     this.edit = true;
    //     this.edittedIngredientIndex = index;
    //     this.edittedIngredient = this.shoppingListService.getIngredient(index);
    //     this.shoppingListForm.setValue({
    //       name: this.edittedIngredient.name,
    //       amount: this.edittedIngredient.amount,
    //     });
    //   }
    // );
  }

  ngOnDestroy() {
    this.ingredientEditSubscription.unsubscribe();
    this.store.dispatch(ShoppingListActions.StopEdit())
  }

  addIngredient(form: NgForm) {
    const ingredient = {
      name: form.value.name,
      amount: +form.value.amount,
    };
    this.edit
      ? this.store.dispatch(ShoppingListActions.UpdateIngredient(ingredient))
      : this.store.dispatch(ShoppingListActions.AddIngredient(ingredient))
    //?this.shoppingListService.updateIngredient(this.edittedIngredientIndex,ingredient)
    //:this.shoppingListService.addIngredient(ingredient);
    this.emptyForm();
  }

  deleteItem() {
    this.store.dispatch(ShoppingListActions.DeleteIngredient());
    this.emptyForm();
    //this.shoppingListService.deleteIngredient(this.edittedIngredientIndex);
  }

  emptyForm() {
    this.shoppingListForm.reset();
    this.store.dispatch(ShoppingListActions.StopEdit())
    // this.edit = false;
    // this.edittedIngredient = undefined;
    // this.edittedIngredientIndex = undefined;
  }


  emptyShoppingList() {
    this.shoppingListService.emptyShoppingList();
  }
}
