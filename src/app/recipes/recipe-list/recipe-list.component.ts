import { Component, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    new Recipe(
      'Gazpacho',
      'Sopa de tomate fresquita para el verano',
      'https://www.comedera.com/wp-content/uploads/2015/06/gazpacho.jpg'
    ),
    new Recipe(
      'Fabada',
      'Plato de cuchara mítico asturiano',
      'https://www.turismoasturias.es/documents/11022/62857/CasaChema_Fabada_1.jpg?t=1389288544723'
    ),
    new Recipe(
      'Carrillera',
      'Manjar de dioses no apto para veganos',
      'https://www.hogarmania.com/archivos/201105/652-menestra-de-carrilleras-de-ternera-xl-668x400x80xX.jpg'
    ),
    new Recipe(
      'Callos',
      'Nunca algo tan asqueroso estuvo tan bueno',
      'https://t2.uc.ltmcdn.com/images/0/8/6/img_como_hacer_callos_a_la_madrilena_6680_600.jpg'
    ),
  ];

  @Output('selectedRecipe') selectedRecipe = new EventEmitter<Recipe>();

  constructor() {}

  showSelectedRecipe(recipe: Recipe) {
    this.selectedRecipe.emit(recipe);
  }
}
