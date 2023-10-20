import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './vendor-page.component.html',
  styleUrls: ['./vendor-page.component.scss']
})
export class VendorPageComponent implements OnInit {

  tab =1;
  option = 0;
  constructor(
  ) {}

  ngOnInit(): void {
  }
}
