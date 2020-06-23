import { Component, Input, AfterViewChecked } from '@angular/core';
import { Recipe } from '../recipe.model';
import { DropdownDirective } from "../../common/dropdown.directive"

@Component({
  selector: 'app-recipe-info',
  templateUrl: './recipe-info.component.html',
  styleUrls: ['./recipe-info.component.css'],
})
export class RecipeInfoComponent implements AfterViewChecked {
  @Input('recipe') recipe: Recipe;

  constructor() {}

  ngAfterViewChecked(): void {
    for (let key in this.recipe) {
      console.log(key);
    }
  }
}
