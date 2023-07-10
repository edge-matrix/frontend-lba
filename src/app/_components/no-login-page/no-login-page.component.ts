import { Component, OnInit } from '@angular/core';
import { SharedService } from '@service';

@Component({
  selector: 'no-login-page',
  templateUrl: './no-login-page.component.html',
  styleUrls: ['./no-login-page.component.scss']
})
export class NoLoginPageComponent implements OnInit {

  constructor(public sharedService: SharedService) { }

  ngOnInit(): void {
  }

}
