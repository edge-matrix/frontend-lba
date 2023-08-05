import { Component, OnInit } from '@angular/core';
import { AuthenticationService, SharedService, StorageService } from '@service';
import { Router } from '@angular/router';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public sharedService: SharedService) {
   }

  ngOnInit(): void {
  }
}
