import { Component, OnInit } from '@angular/core';
import { SharedService } from '@service';


@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  orderType = 0;
  constructor(public sharedService: SharedService,) {
    this.sharedService.sideMenuSelectedIndex = 0;
  }

  ngOnInit(): void {
  }

  updateOrderType(ev: number){
    this.orderType = ev;
  }

}
