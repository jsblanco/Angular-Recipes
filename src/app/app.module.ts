import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './header/navbar/navbar.component';
import { DropdownDirective } from './common/dropdown.directive';
import { ShoppingListService } from './services/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { RecipesService } from './services/recipes.service';
import { RecipeResolverService } from './services/recipe-resolver.service';
import { AuthComponent } from './auth/auth.component';
import { SpinnerComponent } from './common/spinner/spinner.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { AlertComponent } from './alert/alert.component';
import { PlaceholderDirective } from './common/placeholder.directive';
import { RecipesModule } from './recipes/recipes.module'
import { ShoppingListModule } from './shopping-list/shopping-list.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    DropdownDirective,
    AuthComponent,
    SpinnerComponent,
    AlertComponent,
    PlaceholderDirective,
  ],
  imports: [
    FormsModule, 
    BrowserModule, 
    RecipesModule,
    ShoppingListModule,
    ReactiveFormsModule,
    HttpClientModule, 
    AppRoutingModule
  ],
  providers: [ShoppingListService, RecipesService, RecipeResolverService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent],
  entryComponents: [AlertComponent] //solo necesario en Angular <9
})
export class AppModule {}
