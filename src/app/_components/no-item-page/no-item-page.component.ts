import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from '@service';

@Component({
  selector: 'no-item-page',
  templateUrl: './no-item-page.component.html',
  styleUrls: ['./no-item-page.component.scss']
})
export class NoItemPageComponent implements OnInit {

  @Input() text = '';
  constructor(public sharedService: SharedService) { }

  ngOnInit(): void {
  }

}
