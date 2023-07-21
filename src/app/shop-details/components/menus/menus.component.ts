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
    this.updateCat({catId: this.catId, search: ''});
  }

  updateCat(ev: {catId: number, search: string}){
    this.catId = ev.catId;
    this.items = [];
    this.shop.items.forEach(e => {
      if(e.items_categories_id === this.catId || this.catId === 0){
        if(ev.search === '' || e.name.toLowerCase().match(ev.search.toLowerCase())){
          this.items.push(e);
        }
      }
    });
  }

}
