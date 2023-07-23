import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart, Shop, Response, Shoptimings, CreateOrder } from '@models';
import { BookService, ComboDetailsService, SharedService, StorageService } from '@service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';


@Component({
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  cart!: Array<Cart>;
  storageUrl = environment.storage;
  shops!: Shop;
  paymentMethod: Array<{name: string, id: number, active: boolean}> = [];
  payments: { subTotal: number, taxes: number, taxesRate: number, grandTotal: number, discount: number, payableAmount: number } = {
    subTotal: 0,
    taxes: 0,
    taxesRate: 0,
    grandTotal: 0,
    discount: 0,
    payableAmount: 0
  };
  orderId = '';
  isOrderCreated = false;
  isPaymentStart = false;
  constructor(public sharedService: SharedService,
    private storageService: StorageService,
    private comboDetailService: ComboDetailsService,
    private bookService: BookService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,) {
    this.sharedService.sideMenuSelectedIndex = 1;
  }

  ngOnInit(): void {
    this.sharedService.getCartDetails().subscribe((value) => {
      this.cart = value;
      this.calculatePayments();
    });
    this.getShopDetails();
    this.activeRoute.queryParams.subscribe(params => {
      if(params['transactionId']){
        this.updatePaymentStatus(params['transactionId']);
      }
    });
  }

  findItemFromCart(i: number){
    return this.cart.find(e => e.itemDetails.id === i);
  }

  removeFromCart(i: number){
    let index = this.cart.findIndex(e => e.itemDetails.id === i);
    this.cart.splice(index,1);
    this.storageService.updatemyCart(this.cart);
  }

  increaseQuanity(i: number){
    const cartItem = this.findItemFromCart(i);
    if(cartItem){
      cartItem.quantity = cartItem.quantity + 1;
    }
    this.storageService.updatemyCart(this.cart);
  }

  descQuanity(i:number){
    const cartItem = this.findItemFromCart(i);
    if(cartItem){
      if(cartItem.quantity > 1){
        cartItem.quantity = cartItem.quantity - 1;
      } else if(cartItem.quantity === 1){
        this.removeFromCart(i);
      }
    }
    this.storageService.updatemyCart(this.cart);
  }

  getShopDetails(){
    this.comboDetailService.getShopDetails(this.cart[0].shop.slug).subscribe((response: Response) => {
      if (response.statusCode != 200 && response.statusCode != 201) {
        this.toastr.error(this.sharedService.errorMessage(response.Error));
      } else {
        if(response.singleData){
          this.shops = response.singleData;
          this.paymentMethod = [];
          if(this.shops.settings && this.shops.settings.isPayNowEnabled === 1){
            this.paymentMethod.push({ name: 'Pay Now', id: 1, active: false });
          }
          if(this.shops.settings && this.shops.settings.isPayLaterEnabled === 1){
            this.paymentMethod.push({ name: 'Pay At Shop', id: 0, active: false });
          }
          if(this.paymentMethod && this.paymentMethod.length > 0){
            this.paymentMethod[0].active = true;
          }
          this.calculatePayments();
        }
      }
    },
    error => {
      this.toastr.error('Something Went Wrong');
    });
  }

  updateMethod(i: number){
    this.paymentMethod.forEach(e=>{
      if(e.id === i){
        e.active = true;
      }else{
        e.active = false;
      }
    });
  }

  calculatePayments(){
    let subTotal = 0;
    let taxes = 0;
    this.cart.forEach(e => {
      subTotal += e.itemDetails.price * e.quantity;
    });
    if(this.shops.settings && this.shops.settings.chargeableTax === 1){
      taxes = this.shops.settings.taxAmount;
    }
    let grandTotal = subTotal + ( subTotal * taxes/100);
    this.payments = {
      subTotal: subTotal,
      taxes: taxes,
      taxesRate: ( subTotal * taxes/100),
      grandTotal: grandTotal,
      discount: 0,
      payableAmount: grandTotal
    };
  }

  isShopCloseCheck(){
    let isShopOpen = true;
    if(this.shops.timings && this.shops.timings.length > 0){
      let currentTiming = this.shops.timings.find(time => time.dayId === new Date().getDay());
      if(currentTiming){
        if(currentTiming.isOpen){
          let hours = new Date().getHours();
          if(hours < parseInt(currentTiming.openTime.split(':')[0])){
            isShopOpen = false;
          }else if(hours > parseInt(currentTiming.closeTime.split(':')[0])){
            isShopOpen = false;
          }
        }else{
          isShopOpen = false;
        }
      }
    }
    return isShopOpen;
  }

  prepareOrderData(){
    let combos = '';
    let comboQuantity = '';
    let items = '';
    let itemsQuantity = '';
    let addOns = '';
    let addOnsQuantity = '';
    this.cart.forEach(e => {
      items += e.itemDetails.id + ',';
      itemsQuantity += e.quantity + ',';
    });
    if(items !== ''){
      items = items.slice(0, -1)
    }
    if(itemsQuantity !== ''){
      itemsQuantity = itemsQuantity.slice(0, -1)
    }
    let request: CreateOrder = {
      user_id: this.sharedService.user.id,
      name: this.sharedService.user.name,
      shop_id: this.shops.id,

      coinRedeemed: 0,
      paymentStatus: 0,
      paymentMethod: this.paymentMethod.filter(e => e.active)[0].id,
      orderType: 0,

      groupSize: 2,
      bookingDate: new Date().getFullYear() + '-' + (new Date().getMonth() + 1).toString().padStart(2, "0")  + '-' + new Date().getDate().toString().padStart(2, "0"),
      startTime: new Date().getHours().toString().padStart(2, "0") + ':' + new Date().getMinutes().toString().padStart(2, "0"),
      endTime: new Date().getHours().toString().padStart(2, "0") + ':' + new Date().getMinutes().toString().padStart(2, "0"),
      isTimeBound: 0,
      note: '',
      medium: 'LBA',

      combos: combos,
      comboQuantity: comboQuantity,
      items: items,
      itemsQuantity: itemsQuantity,
      addOns: addOns,
      addOnsQuantity: addOnsQuantity,
    }
    return request;
  }

  placeOrder(){
    if(!this.isShopCloseCheck()){
      if(!confirm("Shop is closed. are you still want to place an order?")) {
        return;
      }
    }

    if(this.payments.payableAmount <= 0 && this.cart.length === 0){
      this.toastr.error("No item is selected");
      return;
    }
    //Order Request Below
    let request = this.prepareOrderData();
    this.bookService.placeOrder(request).subscribe((response: Response) => {
      if (response.statusCode != 200 && response.statusCode != 201) {
        this.toastr.error(this.sharedService.errorMessage(response.Error));
      } else {
        if(response.success){
          this.toastr.success("Order Placed Successfully.");
          this.isOrderCreated = true;
          this.orderId = response.success;
          if(this.paymentMethod.filter(e => e.active)[0].id === 1 && this.payments.payableAmount > 0){
            this.isPaymentStart = true;
          }else{
            this.reOrder();
          }
        }
      }
    },
    error => {
      this.toastr.error('Something Went Wrong');
    });
  }

  reOrder(){
    if(this.paymentMethod.filter(e => e.active)[0].id === 1 && this.payments.payableAmount > 0){
      this.isPaymentStart = true;
      return;
    }else{
      const paymentDetails = {
        paymentMethod: 0,
        transactionId: this.orderId,
      };
      this.updatePaymentDetails(paymentDetails);
    }
  }

  updatePaymentDetails(data: { paymentMethod: number; transactionId: string;}){
    this.bookService.updatePaymentDetails(data).subscribe((response: Response) => {
      if (response.statusCode != 200 && response.statusCode != 201) {
        this.toastr.error(this.sharedService.errorMessage(response.Error));
      } else {
        this.storageService.updatemyCart([]);
        if(response.singleData){
          this.orderId = response.singleData;
          this.router.navigate(['/order-page/'+this.orderId],{ queryParams: { orderPlaced: "true"}});
        }
      }
    },
    error => {
      this.toastr.error('Something Went Wrong');
    });
  }

  updatePaymentStatus(transactionId: string){
    this.isPaymentStart = false;
    if(transactionId !== ''){
      const paymentDetails = {
        paymentMethod: 1,
        transactionId: transactionId,
      };
      this.updatePaymentDetails(paymentDetails);
    }
  }
}
