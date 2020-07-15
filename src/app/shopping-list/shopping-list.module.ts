import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';
import { CommonFunctionsModule } from '../common/common-functions.module';


@NgModule({
    declarations:[
        ShoppingListComponent,
        ShoppingListEditComponent
    ],
    imports: [
        FormsModule,
        CommonFunctionsModule,
        RouterModule.forChild([
            { path: '', component: ShoppingListComponent }
        ]),
    ]
})
export class ShoppingListModule {}