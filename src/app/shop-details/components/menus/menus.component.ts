import { Component, Input, OnInit } from '@angular/core';
import { Items, Shop } from '@models';

@Component({
  selector: 'menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss']
})
export class MenusComponent implements OnInit {

  @Input() shop!: Shop;
  items: Array<Items> = [];
  catId = 0;
  constructor() { }
  ngOnInit(): void {
    this.updateCat(this.catId);
  }

  updateCat(ev: number){
    this.catId = ev;
    this.items = [];
    this.shop.items.forEach(e => {
      if(e.items_categories_id === this.catId || this.catId === 0){
        this.items.push(e);
      }
    });
  }

}
