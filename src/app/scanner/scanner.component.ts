import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ComboDetailsService, SharedService } from '@service';

import { environment } from 'src/environments/environment';
import { Shop, Response } from '@models';
import { ScannerQRCodeConfig, ScannerQRCodeSelectedFiles, NgxScannerQrcodeService, ScannerQRCodeResult, NgxScannerQrcodeComponent} from 'ngx-scanner-qrcode';


@Component({
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
})
export class ScannerComponent implements OnInit {

  @ViewChild('action')
  action!: NgxScannerQrcodeComponent;
  @Output() newItemEvent = new EventEmitter<string>();
  public config: ScannerQRCodeConfig = {
    // fps: 1000,
    vibrate: 400,
    isBeep: false,
    // decode: 'macintosh',
    constraints: {
      audio: false,
      video: {
        width: window.innerWidth
      }
    },
    canvasStyles: [
      { /* layer */
        lineWidth: 5,
        fillStyle: '#00950685',
        strokeStyle: '#00950685',
      },
      { /* text */
        font: '2px serif',
        fillStyle: '#ffffff',
        strokeStyle: '#ffffff',
      }
    ],
  };
  public qrCodeResult: ScannerQRCodeSelectedFiles[] = [];

  shops: Array<Shop> = [];
  storageLink = environment.storage;
  constructor(
    public sharedService: SharedService,
    private router: Router,
    private comboDetailService: ComboDetailsService,

  ){
    this.sharedService.sideMenuSelectedIndex = 2;
  }

  ngOnInit(): void {
    this.favShop();
  }

  openSearch(){
    this.router.navigate(['/search']);
  }

  favShop(){
    this.comboDetailService.getFavShop().subscribe((response: Response) => {
      if (response.statusCode != 200 && response.statusCode != 201) {
        this.sharedService.showMessage(1,this.sharedService.errorMessage(response.Error));
      } else {
        if(response.data){
          this.shops = response.data
        }
      }
    },
    error => {
      this.sharedService.showMessage(1,'Something Went Wrong');
    });
  }

  ngAfterContentInit(): void {
    setTimeout(() => {
      this.action.start();
      this.action.decode == 'utf-8';
      this.action.isStart?'stop':'start';
    }, 50);
    setTimeout(() => {
      this.action.devices.value.forEach((e) => {
        if(e.label.includes("back")){
          this.action.playDevice(e.deviceId);
        }
      });
    }, 1000);
  }

  public onEvent(e: ScannerQRCodeResult[]): void {
    if(e && e.length > 0){
      const appLink = environment.appUrl;
      if (e[0].value.indexOf(appLink) >= 0){
        $('#close').click();
        this.router.navigateByUrl(e[0].value.replace(appLink,''));
      }else{
        this.sharedService.showMessage(1,'QR Code is Invalid');
        this.handle(this.action,'pause');
      }
    }
  }

  public handle(action: any, fn: string): void {
    action[fn]().subscribe(console.log, alert);
  }

  ngOnDestroy(): void {
    if(this.action && this.action.isStart){
      this.handle(this.action,'stop');
    }
  }

}
