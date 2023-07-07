import { Component, OnInit } from '@angular/core';
import { SharedService } from '@service';


@Component({
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  constructor(public sharedService: SharedService,) {
    this.sharedService.sideMenuSelectedIndex = 3;
  }

  ngOnInit(): void {
  }

}
