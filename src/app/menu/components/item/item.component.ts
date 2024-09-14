import { Component, Input, OnInit } from '@angular/core';
import { Cart, Items, Shop } from '@models';
import { CommonFunctionService, SharedService, StorageService } from '@service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'menu-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input() shop!: Shop;
  @Input() menu: Array<Items> = [];
  storageUrl = environment.storage;
  itemLists: Array<{item: Items, isSelected: boolean, count: number}> = [];
  cart!: Array<Cart>;
  openModal = false;
  selectedItem!: Items;
  constructor(
    public sharedService: SharedService,
    private storageService: StorageService,
    public commonService: CommonFunctionService,

  ) { }

  ngOnChanges(){
    this.itemLists = [];
    this.menu.forEach(e => {
      let count = this.findItemFromCart(e.id)?.quantity;
      if(count){
        this.itemLists.push({item: e, isSelected: true, count: count});
      }else{
        this.itemLists.push({item: e, isSelected: false, count: 0});
      }
    });
  }

  ngOnInit(): void {
    this.sharedService.getCartDetails().subscribe((value) => {
      this.cart = value;
    });
    this.ngOnChanges();
  }


  findItemFromCart(i: number){
    if(this.cart){
      return this.cart.find(e => e.itemId === i);
    }
    return;
  }

  isShopSame(shopId: number){
    let out = true;
    this.cart.forEach(e => {
      if(e.shop_id !== shopId){
        out = false;
      }
    });
    return out;
  }

  addToCart(id: number){
    let itemDetail = this.itemLists.find(e => e.item.id === id);
    if(itemDetail && !this.isShopSame(itemDetail.item.shop_id))
    {
      this.sharedService.showMessage(1,"Item's shop is different from cart shop, clear cart to add this.");
      return;
    }
    let shop = Object.assign({}, this.shop);
    Object.keys(shop).forEach(k => {
      if(Array.isArray(shop[k as keyof typeof shop])){
        delete shop[k as keyof typeof shop];
      }
    });
    if(itemDetail){
      itemDetail.isSelected = true;
      itemDetail.count = 1;
      let cart:Cart = {
        itemId: id,
        itemDetails: itemDetail.item,
        type: 'Item',
        quantity: 1,
        date: new Date().toISOString(),
        shop_id: itemDetail.item.shop_id,
        shop: shop,
        isVariantSelected: false
      };
      this.cart.push(cart);
      this.storageService.updatemyCart(this.cart);
    }
  }

  removeFromCart(i: number){
    let itemDetail = this.itemLists.find(e => e.item.id === i);
    if(itemDetail){
      itemDetail.count = 0;
      itemDetail.isSelected = false;
    }
    let index = this.cart.findIndex(e => e.itemId === i);
    this.cart.splice(index,1);
    this.storageService.updatemyCart(this.cart);
  }

  increaseQuanity(i: number){
    const cartItem = this.findItemFromCart(i);
    let itemDetail = this.itemLists.find(e => e.item.id === i);
    if(cartItem && itemDetail){
      itemDetail.count = itemDetail.count + 1;
      cartItem.quantity = cartItem.quantity + 1;
    }else if(cartItem === undefined){
      this.addToCart(i);
    }
    this.storageService.updatemyCart(this.cart);
  }

  descQuanity(i:number){
    const cartItem = this.findItemFromCart(i);
    let itemDetail = this.itemLists.find(e => e.item.id === i);
    if(cartItem && itemDetail){
      if(cartItem.quantity > 1){
        itemDetail.count = itemDetail.count - 1;
        cartItem.quantity = cartItem.quantity - 1;
      } else if(cartItem.quantity === 1){
        this.removeFromCart(i);
      }
    }
    this.storageService.updatemyCart(this.cart);
  }

  openVariantModal(item: Items){
    let itemDetail = this.itemLists.find(e => e.item.id === item.id);
    if(itemDetail && !this.isShopSame(itemDetail.item.shop_id))
    {
      this.sharedService.showMessage(1,"Item's shop is different from cart shop, clear cart to add this.");
      return;
    }
    this.openModal = true;
    this.selectedItem = item;
  }

  closeVariantModal(ev: any){
    this.openModal = false;
    if(ev === 1){
      let itemDetail = this.itemLists.find(e => e.item.id === this.selectedItem.id);
      if(itemDetail)
      {
        itemDetail.isSelected = true;
      }
    }else if(ev === -1){
      let itemDetail = this.itemLists.find(e => e.item.id === this.selectedItem.id);
      if(itemDetail)
      {
        itemDetail.isSelected = false;
      }
    }
  }
}
