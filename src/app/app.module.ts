import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './header/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { RecipesModule } from './recipes/recipes.module'
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { CommonFunctionsModule } from './common/common-functions.module';
import { CoreModule } from './core.module'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
  ],
  imports: [
    AuthModule,
    RecipesModule,
    ShoppingListModule,
    
    CommonFunctionsModule, 
    CoreModule,
    
    BrowserModule,
    HttpClientModule, 
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
