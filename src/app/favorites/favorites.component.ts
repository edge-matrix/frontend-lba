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
  openModal = false;
  selectedItem!: Items;
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

  isShopDifferent(shopId: number){
    if(this.sharedService.currentShop && this.sharedService.currentShop.id != shopId){
      return true;
    }else{
      return false;
    }
  }

  addToCart(id: number){
    let itemDetail = this.itemLists.find(e => e.item.id === id);
    if(itemDetail && this.isShopDifferent(itemDetail.item.shop_id))
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
        isVariantSelected: false
      };
      this.cart.push(cart);
      this.storageService.updatemyCart(this.cart);
      this.storageService.updateCurrentShop(itemDetail.item.shop);
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
    if(this.cart.length === 0){
      this.storageService.updateCurrentShop(null);
    }
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

  openVariantModal(item: Items){
    let itemDetail = this.itemLists.find(e => e.item.id === item.id);
    if(itemDetail && this.isShopDifferent(itemDetail.item.shop_id))
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
