import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../common/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from './store/shopping-list.actions'
import * as fromRoot from '../store/app.reducer'


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ingredients: Ingredient[]}>
  //ingredients: Ingredient[] = [];
  //private ingredientChanges: Subscription;

  constructor(
    private store: Store<fromRoot.AppState>
    //private shoppingListService: ShoppingListService, 
    ) { }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
    //this.ingredients = this.shoppingListService.getIngredients();
    // this.ingredientChanges = this.shoppingListService.listChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // );
  }
  
  ngOnDestroy() {
    //this.ingredientChanges.unsubscribe()
  }


  editIngredient(index: number) {
    this.store.dispatch(ShoppingListActions.StartEdit(index))
    //this.shoppingListService.startedEditing.next(index);
  }


}