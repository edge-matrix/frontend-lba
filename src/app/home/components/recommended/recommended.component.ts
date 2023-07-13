import { Component, OnInit } from '@angular/core';
import { Cart, Items, Paginate, Response } from '@models';
import { ComboDetailsService, CommonFunctionService, SharedService, StorageService } from '@service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'home-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.scss']
})
export class RecommendedComponent implements OnInit {

  itemLists: Array<{item: Items, isSelected: boolean, count: number}> = [];

  storageUrl = environment.storage;
  cart!: Array<Cart>;
  constructor(
    private comboDetailService: ComboDetailsService,
    private sharedService: SharedService,
    private storageService: StorageService,
    public commonService: CommonFunctionService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.sharedService.getCartDetails().subscribe((value) => {
      this.cart = value;
    });
    this.getItemList();
  }

  getItemList(){
    this.comboDetailService.getRecommended().subscribe((response: Response) => {
      if (response.statusCode != 200 && response.statusCode != 201) {
        this.toastr.error(this.sharedService.errorMessage(response.Error));
      } else {
        if(response.data){
          response.data.forEach(e => {
            let count = this.findItemFromCart(e.id)?.quantity;
            if(count){
              this.itemLists.push({item: e, isSelected: true, count: count});
            }else{
              this.itemLists.push({item: e, isSelected: false, count: 0});
            }
          });
        }
      }

    },
    error => {
      this.toastr.error('Something Went Wrong');

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
      this.toastr.error("Item's shop is different from cart shop, clear cart to add this.");
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
}
