import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import {RouterModule} from '@angular/router';
import { HeaderComponent, FooterComponent, BottomNavComponent, CartComponent } from '.';
import { SharedComponentModule } from "../_shared/shared.module";

@NgModule({
    declarations: [
        /* Components */
        HeaderComponent,
        FooterComponent,
        BottomNavComponent,
        CartComponent,
    ],
    exports: [
        /* Components */
        HeaderComponent,
        FooterComponent,
        BottomNavComponent,
        CartComponent,
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
