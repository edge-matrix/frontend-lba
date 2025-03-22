import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cart, Items, Shop } from '@models';
import { SharedService, StorageService } from '@service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'variants',
  templateUrl: './variants.component.html',
  styleUrls: ['./variants.component.scss']
})
export class VariantsComponent implements OnInit {

  @Input() item!: Items;
  @Input() shop!: Shop;
  @Output() newItemEvent = new EventEmitter<number>();
  isItemExist = false;
  selectedVariant!: { id: number, name: string, price: number; type: number; quantity: number };
  qty = 1;
  cart!: Array<Cart>;
  cartWithItem: Array<{index:number; cart: Cart}> = [];
  height = 20;
  storageUrl = environment.storage;
  constructor(public sharedService: SharedService,private storageService: StorageService) { }


  ngOnInit(): void {
    this.sharedService.getCartDetails().subscribe((value) => {
      this.cart = value;
    });
    // this.selectedVariant = this.item.variants[0];
    this.isItemExist = this.checkAlreadyAdded();
    this.calHight();
    $('#model-btn').click();
  }

  checkAlreadyAdded(){
    let isExist = false;
    this.cartWithItem = [];
    this.cart.forEach((crt, index) => {
      if(crt.itemId === this.item.id){
        isExist = true;
        this.cartWithItem.push({
          index: index,
          cart: crt
        });
      }
    });
    return isExist;
  }

  calHight(){
    // if(this.isItemExist){
    //   this.height = 20 + (this.cartWithItem.length * 8);
    // }else{
    //   this.height = 20 + (this.item.variants.length * 8);
    // }
    // if(this.height >= 48){
    //   this.height = 48;
    // }
    this.height = 70;
  }

  addToCart(){
    let cart:Cart = {
      itemId: this.item.id,
      isVariantSelected: true,
      variant: this.selectedVariant,
      itemDetails: this.item,
      type: 'Item',
      quantity: this.qty,
      date: new Date().toISOString(),
      shop_id: this.item.shop_id,
    };
    this.cart.push(cart);
    this.storageService.updatemyCart(this.cart);
    this.storageService.updateCurrentShop(this.shop);
    (this.cartWithItem.length > 0 && !this.isItemExist)?this.closeToSelect():this.close(1);
  }

  removeFromCart(index: number, i: number){
    this.cartWithItem.splice(index, 1);
    this.cart.splice(i,1);
    this.storageService.updatemyCart(this.cart);
    this.calHight();
    if(this.cart.length === 0){
      this.storageService.updateCurrentShop(null);
    }
    if(this.cartWithItem.length === 0){
      this.close(-1);
    }
  }

  increaseQuanity(index: number, i: number){
    this.cart[i].quantity = this.cart[i].quantity + 1;
    this.storageService.updatemyCart(this.cart);
  }

  descQuanity(index: number, i: number){
    if(this.cartWithItem[index].cart.quantity > 1){
      this.cart[i].quantity = this.cart[i].quantity - 1;
      this.storageService.updatemyCart(this.cart);
    }
  }

  checkVariantExists(id: number){
    let out = false;
    this.cartWithItem.forEach(e => {
      if(e.cart.variant && e.cart.variant.id === id){
        out = true;
      }
    });
    return out;
  }

  close(status:number){
    $('#modal-close-btn').click();
    setTimeout(() => {
      this.newItemEvent.emit(status);
    }, 500);
  }

  closeToSelect(){
    // this.selectedVariant = this.item.variants[0];
    this.qty = 1;
    this.isItemExist = this.checkAlreadyAdded();
    this.calHight();
  }

}
