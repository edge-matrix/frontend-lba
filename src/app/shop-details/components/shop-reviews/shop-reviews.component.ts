import { Component, Input, OnInit } from '@angular/core';
import { ShopReviews } from '@models';

@Component({
  selector: 'shop-reviews',
  templateUrl: './shop-reviews.component.html',
  styleUrls: ['./shop-reviews.component.scss']
})
export class ShopReviewsComponent implements OnInit {

  @Input() reviews: Array<ShopReviews> = [];
  constructor() { }

  ngOnInit(): void {
  }

}
