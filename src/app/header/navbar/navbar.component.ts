import { Component, OnInit } from '@angular/core';
import { RecipeStorageService } from 'src/app/services/recipe-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  constructor(private recipeStorageService: RecipeStorageService) {}

  ngOnInit(): void {
    // this.recipeStorageService.getStoredRecipes().subscribe();
  }

  onSaveRecipes(){
    this.recipeStorageService.storeRecipes();
  }

  onLoadRecipes(){
    this.recipeStorageService.getStoredRecipes().subscribe();
  }

}
