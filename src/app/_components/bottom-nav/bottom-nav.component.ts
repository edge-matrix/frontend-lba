import { Component, OnInit } from '@angular/core';
import { SharedService } from '@service';

@Component({
  selector: 'bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss']
})
export class BottomNavComponent implements OnInit {

  constructor(public sharedService: SharedService) {
  }

  ngOnInit(): void {
  }

}
