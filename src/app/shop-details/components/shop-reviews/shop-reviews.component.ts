import { Component, Input, OnInit } from '@angular/core';
import { ShopReviews } from '@models';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'shop-reviews',
  templateUrl: './shop-reviews.component.html',
  styleUrls: ['./shop-reviews.component.scss']
})
export class ShopReviewsComponent implements OnInit {

  @Input()reviews: Array<ShopReviews> = [];
  storageLink = environment.storage;
  ratingRatio: Array<{index:number,rate:number}> = [];
  constructor(
  ) {
    console.log(this.reviews);
  }

  ngOnInit(): void {
    Array.from(Array(5).keys()).forEach(i=>{
      let count = this.reviews.filter(x => x.rate === (i+1)).length;
      this.ratingRatio.push({index:i+1,rate:count});
    });
    this.ratingRatio.reverse();
  }

  rateCounter(rate: number)
  {
    return Array.from(Array(rate).keys());
  }

  calculateRate(rate: number){
    const ratePer = Math.floor((rate/this.reviews.length)*100);
    if(ratePer === 0){
      return '';
    }else{
      return ratePer+'%';
    }
  }
}
