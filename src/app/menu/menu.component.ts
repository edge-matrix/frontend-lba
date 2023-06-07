import { Component, OnInit } from '@angular/core';
import { SharedService } from '@service';


@Component({
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(public sharedService: SharedService,) {
    this.sharedService.sideMenuSelectedIndex = 1;
  }

  ngOnInit(): void {
  }

}
