import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import {RouterModule} from '@angular/router';
import { HeaderComponent, FooterComponent, BottomNavComponent, CartComponent, CurrentOrderComponent } from '.';
import { SharedComponentModule } from "../_shared/shared.module";

@NgModule({
    declarations: [
        /* Components */
        HeaderComponent,
        FooterComponent,
        BottomNavComponent,
        CartComponent,
        CurrentOrderComponent
    ],
    exports: [
        /* Components */
        HeaderComponent,
        FooterComponent,
        BottomNavComponent,
        CartComponent,
        CurrentOrderComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        FormsModule,
        SharedComponentModule
    ]
})
export class CommonComponentModule { }
