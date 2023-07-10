import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Shop, Shoptimings } from '@models';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Clipboard } from '@angular/cdk/clipboard';
import { Router } from '@angular/router';

declare const window: any;

@Component({
  selector: 'shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.scss']
})
export class ShopDetailsComponent implements OnInit {

  @Input() tab!: number;
  @Input() shop!: Shop;
  @Output() newItemEvent = new EventEmitter<number>();

  storageLink = environment.storage;
  numberOfRating = Math.floor(Math.random() * 1000) + 1;
  timingText = '';
  showTimings = 0;
  timingTitle = '';
  constructor(private toastr: ToastrService, private clipboard: Clipboard, private router: Router) { }

  ngOnInit(): void {
    let day = new Date().getDay();
    let timings = this.shop.timings;
    if(timings && timings.length > 0){
      let currentTiming = timings.find(time => time.dayId === day);
      if(currentTiming){
        this.setTimingText(currentTiming);
      }
    }
  }

  setTimingText(timings: Shoptimings){
    if(timings.isOpen){
      this.showTimings = 1;
      let hours = new Date().getHours();
      if(hours < parseInt(timings.openTime.split(':')[0])){
        this.timingText = 'Shop Will Open At '+ this.updateTimeFormat(timings.openTime);
      }else if(hours >= parseInt(timings.openTime.split(':')[0]) && hours <= parseInt(timings.closeTime.split(':')[0])){
        this.timingText = 'Open Now: Close At '+ this.updateTimeFormat(timings.closeTime);
      }else{
        this.timingText = 'Shop Closed At '+ this.updateTimeFormat(timings.closeTime);
        this.showTimings = 2;
      }
    }else{
      this.timingText = 'Shop is Closed Today';
      this.showTimings = 2;
    }
  }

  updateTimeFormat(time: string){
    if(parseInt(time.split(':')[0]) == 12){
      time = "12:" + time.split(':')[1]  + ' PM';
    }else if(parseInt(time.split(':')[0]) == 24){
      time = "00:" + time.split(':')[1]  + ' AM';
    }else if(parseInt(time.split(':')[0]) > 12 && parseInt(time.split(':')[0]) < 24)
    {
      time = (parseInt(time.split(':')[0]) - 12) + ':' + time.split(':')[1]  + ' PM';
    }else{
      time = (time.split(':')[0]) + ':' + time.split(':')[1]  + ' AM';
    }
    return time;
  }

  getDirection(){
    if(this.shop.address && this.shop.address.length > 0){
      let lat = this.shop.address[0].lat;
      let lng = this.shop.address[0].long;
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
    }
  }

  updateTab(num : number){
    this.newItemEvent.emit(num);
  }

  addFav(){
    this.toastr.info('Will work on this feature later');
  }

  share(){
    this.toastr.info('Shop address copied to clipboard !');
    this.clipboard.copy(environment.appUrl + this.router.url);
  }

}
