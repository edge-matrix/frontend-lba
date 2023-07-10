import { Component, Input, OnInit } from '@angular/core';
import { Shop } from '@models';

@Component({
  selector: 'shop-overview',
  templateUrl: './shop-overview.component.html',
  styleUrls: ['./shop-overview.component.scss']
})
export class ShopOverviewComponent implements OnInit {

  @Input() shop!: Shop;
  constructor() { }

  ngOnInit(): void {
  }

}
