import { Component, OnInit } from '@angular/core';
import { SharedService } from '@service';

@Component({
  selector: 'current-order',
  templateUrl: './current-order.component.html',
  styleUrls: ['./current-order.component.scss']
})
export class CurrentOrderComponent implements OnInit {

  constructor(public sharedService: SharedService) { }

  ngOnInit(): void {
  }

}
