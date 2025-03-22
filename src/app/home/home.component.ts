import { Component, OnInit } from '@angular/core';
import { SharedService } from '@service';


@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public sharedService: SharedService,) {
    this.sharedService.sideMenuSelectedIndex = 0;
  }

  ngOnInit(): void {
  }

}
