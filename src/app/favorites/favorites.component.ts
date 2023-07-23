import { Component, OnInit } from '@angular/core';
import { CommonFunctionService, SharedService, StorageService } from '@service';
import { Cart, Items, Shop } from '@models';
import { environment } from 'src/environments/environment';



@Component({
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  type = 1;
  storageUrl = environment.storage;
  cart!: Array<Cart>;
  itemLists: Array<{item: Items, isSelected: boolean, count: number}> = [];
  shopLists: Array<Shop> = [];
  constructor(public sharedService: SharedService,
    private storageService: StorageService,
    public commonService: CommonFunctionService,

    ) {
    this.sharedService.sideMenuSelectedIndex = 1;
  }

  ngOnInit(): void {
    this.sharedService.getCartDetails().subscribe((value) => {
      this.cart = value;
      if(this.sharedService.user && this.sharedService.user.id > 0)
      {
        this.getFavs();
      }
    });
  }

  getFavs(){
    this.itemLists = [];
    this.shopLists = [];
    this.sharedService.userFav.forEach(e => {
      if(e.type === 0 && e.shop){
        this.shopLists.push(e.shop);
      }else if(e.type === 1 && e.item && e.items_id){
        let count = this.findItemFromCart(e.items_id)?.quantity;
        if(count){
          this.itemLists.push({item: e.item, isSelected: true, count: count});
        }else{
          this.itemLists.push({item: e.item, isSelected: false, count: 0});
        }
      }
    });
  }

  findItemFromCart(i: number){
    return this.cart.find(e => e.itemId === i);
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
    if(itemDetail && itemDetail.item.shop){
      itemDetail.isSelected = true;
      itemDetail.count = 1;
      let cart:Cart = {
        itemId: id,
        itemDetails: itemDetail.item,
        type: 'Item',
        quantity: 1,
        date: new Date().toISOString(),
        shop_id: itemDetail.item.shop_id,
        shop: itemDetail.item.shop
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

  removeFavItem(id: number){
    this.commonService.deleteFav(1, id);
    //window.location.reload();
  }
}
