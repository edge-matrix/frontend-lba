import { Component, OnInit } from '@angular/core';
import { SharedService } from '@service';


@Component({
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(public sharedService: SharedService,) {
    this.sharedService.sideMenuSelectedIndex = 4;
  }

  ngOnInit(): void {
  }

}
