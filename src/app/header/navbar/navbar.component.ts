import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeStorageService } from 'src/app/services/recipe-storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private loggedUserSub: Subscription;

  constructor(private recipeStorageService: RecipeStorageService, private auth: AuthService) {}

  ngOnInit(): void {
    this.loggedUserSub = this.auth.loggedUser.subscribe(user=>{
      this.isAuthenticated= !!user;
    });
  }

  ngOnDestroy(): void{
    this.loggedUserSub.unsubscribe()
  }

  onSaveRecipes(){
    this.recipeStorageService.storeRecipes();
  }

  onLoadRecipes(){
    this.recipeStorageService.getStoredRecipes().subscribe();
  }

  onLogout(){
    this.auth.logout();
  }

}
