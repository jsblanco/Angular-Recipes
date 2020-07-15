import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonFunctionsModule } from '../common/common-functions.module';


@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [
        FormsModule,
        CommonFunctionsModule,
        RouterModule.forChild([
            { path: 'auth', component: AuthComponent }
        ]),
    ]
})
export class AuthModule {}
