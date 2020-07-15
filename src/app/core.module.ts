import { NgModule } from '@angular/core'
import { HTTP_INTERCEPTORS } from '@angular/common/http'

import { RecipesService } from './services/recipes.service';
import { ShoppingListService } from './services/shopping-list.service';
import { RecipeResolverService } from './services/recipe-resolver.service';
import { AuthInterceptorService } from './services/auth-interceptor.service';

@NgModule({
    providers: [
        RecipesService, 
        ShoppingListService, 
        RecipeResolverService, 
        //authService y authInterceptors ya están provided en su decorator
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
    ]
})
export class CoreModule { }