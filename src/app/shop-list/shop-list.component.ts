import { Component, OnInit } from '@angular/core';
import { SharedService } from '@service';


@Component({
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss']
})
export class ShopListComponent implements OnInit {

  constructor(public sharedService: SharedService,) {
    this.sharedService.sideMenuSelectedIndex = 1;
  }

  ngOnInit(): void {
  }

}
