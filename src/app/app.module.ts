import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { EffectsModule } from '@ngrx/effects'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { StoreRouterConnectingModule } from '@ngrx/router-store'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './header/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonFunctionsModule } from './common/common-functions.module';
import { CoreModule } from './core.module'
import { StoreModule } from '@ngrx/store'
import { AuthEffects } from './auth/store/auth.effects';
import * as fromRoot from './store/app.reducer'
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
  ],
  imports: [
    //AuthModule,
    //RecipesModule,
    //ShoppingListModule,

    CommonFunctionsModule,
    CoreModule,

    StoreModule.forRoot(fromRoot.appReducer),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({logOnly: environment.production == false}),
    StoreRouterConnectingModule.forRoot(),

    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
