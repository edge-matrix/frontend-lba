import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { ScannerRoutingModule } from './scanner-routing.module';
import { ScannerComponent } from './scanner.component';
import { CommonComponentModule } from '../_components/common-component.module';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';

@NgModule({
  declarations: [
    ScannerComponent

  ],
  imports: [
    CommonModule,
    ScannerRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonComponentModule,
    NgxScannerQrcodeModule,
  ]
})
export class ScannerModule { }
