import { NgModule } from '@angular/core';
import { AlertComponent } from '../alert/alert.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { PlaceholderDirective } from './placeholder.directive';
import { DropdownDirective } from './dropdown.directive';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        AlertComponent,
        SpinnerComponent,
        PlaceholderDirective,
        DropdownDirective
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        AlertComponent,
        SpinnerComponent,
        PlaceholderDirective,
        DropdownDirective,
        CommonModule
    ]
    //, entryComponents: [AlertComponent] //solo necesario en Angular <9
})
export class CommonFunctionsModule {}