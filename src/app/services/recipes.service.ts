import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../common/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  recipes: Recipe[] = [
    new Recipe(
      'Gazpacho',
      'Sopa de tomate fresquita para el verano',
      'https://www.comedera.com/wp-content/uploads/2015/06/gazpacho.jpg',
      [
        new Ingredient('Tomates', 3),
        new Ingredient('Pimientos', 1),
        new Ingredient('Panes', 2),
      ]
    ),
    new Recipe(
      'Fabada',
      'Plato de cuchara mítico asturiano',
      'https://www.turismoasturias.es/documents/11022/62857/CasaChema_Fabada_1.jpg?t=1389288544723',
      [
        new Ingredient('Fabas', 5),
        new Ingredient('Chorizos', 2),
        new Ingredient('Morcillas', 2),
      ]
    ),
    new Recipe(
      'Carrillera',
      'Manjar de dioses no apto para veganos',
      'https://www.hogarmania.com/archivos/201105/652-menestra-de-carrilleras-de-ternera-xl-668x400x80xX.jpg',
      [
        new Ingredient('Carrilleras', 3),
        new Ingredient('Pimienta', 1),
        new Ingredient('Patatas', 2),
      ]
    ),
    new Recipe(
      'Callos',
      'Nunca algo tan asqueroso estuvo tan bueno',
      'https://t2.uc.ltmcdn.com/images/0/8/6/img_como_hacer_callos_a_la_madrilena_6680_600.jpg',
      [
        new Ingredient('Callos', 6),
        new Ingredient('Pimentón', 1),
        new Ingredient('Panes', 3),
      ]
    ),
  ];

  selectedRecipe = new EventEmitter<Recipe>();

  constructor() {}

  getRecipe(id: number) {
    // const selectedRecipe= this.recipes.find((recipe) => {
    //   recipe.name.includes(name);
    // });
    // console.log({selectedRecipe})
    return this.recipes[id]
  }
}
