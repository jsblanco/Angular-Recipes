import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { RecipeStorageService } from 'src/app/services/recipe-storage.service';
import { AuthService } from 'src/app/services/auth.service';
import * as fromRoot from '../../store/app.reducer';
import * as AuthActions from '../../auth/store/auth.actions';
import * as RecipeActions from '../../recipes/store/recipe.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private loggedUserSub: Subscription;

  constructor(private recipeStorageService: RecipeStorageService, private auth: AuthService, private store: Store<fromRoot.AppState>) { }

  ngOnInit(): void {
    //this.loggedUserSub = this.auth.loggedUser
    this.loggedUserSub = this.store.select('auth')
      .pipe(map(authState => authState.user))
      .subscribe(user => {
        this.isAuthenticated = !!user;
      });
  }

  ngOnDestroy(): void {
    this.loggedUserSub.unsubscribe();
  }

  onSaveRecipes() {
    this.recipeStorageService.storeRecipes();
  }

  onLoadRecipes() {
    this.store.dispatch(new RecipeActions.FetchRecipes() )
    //this.recipeStorageService.getStoredRecipes().subscribe();
  }

  onLogout() {
    this.store.dispatch(AuthActions.Logout())
    //this.auth.logout();
  }

}
