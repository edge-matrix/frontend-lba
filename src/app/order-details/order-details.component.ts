import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Cart, Orders, OrdersProducts, Response } from '@models';
import { BookService, ComboDetailsService, OrdersService, SharedService, StorageService } from '@service';

import { Subscription, interval } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  orderId = '';
  order!: Orders;
  navSubscription!: Subscription;
  storageUrl = environment.storage;
  cancleStatus = false
  timer!: Subscription;
  constructor(
    public sharedService: SharedService,
    private storageService: StorageService,

    private bookService: BookService,
    private comboService: ComboDetailsService,
    private orderService: OrdersService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ){
    this.sharedService.sideMenuSelectedIndex = 3;
    this.navSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.orderId = this.activeRoute.snapshot.params['orderId'];
        this.orderDetails();
      }
    });
  }

  ngOnInit(): void {
    this.orderId = this.activeRoute.snapshot.params['orderId'];
    this.orderDetails();
    this.sharedService.newNotification.subscribe((v: Notification | null) => {
      if(v != null){
        this.orderDetails();
      }
    });
  }

  orderDetails(){
    this.bookService.orderDetails(this.orderId).subscribe((response: Response) => {
      if (response.statusCode != 200 && response.statusCode != 201) {
        this.sharedService.showMessage(1,this.sharedService.errorMessage(response.Error));
        this.router.navigate(['/']);
      } else {
        if(response.singleData){
          this.order = response.singleData;
        }
      }
    },
    error => {
      this.sharedService.showMessage(1,'Something Went Wrong');
    });
  }

  getStatus(id: number){
    const status = [
      {id: 0, title: 'Placed', class: 'ordercooking', img: 'status/placed.png'},
      {id: 1, title: 'Pending', class: 'ordercooking', img: 'status/pending.png'},
      {id: 2, title: 'Accepted', class: 'orderconfirmed', img: 'status/accepted.png'},
      {id: 3, title: 'Rejected', class: 'orderrejected', img: 'status/rejected.png'},
      {id: 4, title: 'In Process', class: 'ordercooking', img: 'status/pending.png'},
      {id: 5, title: 'Cooking', class: 'ordercooking', img: 'status/cooking.png'},
      {id: 6, title: 'Ready To Serve', class: 'orderreadytoserve', img: 'status/ready_to_serve.png'},
      {id: 7, title: 'Complete', class: 'orderconfirmed', img: 'status/completed.png'},
      {id: 8, title: 'Complete & Paid', class: 'orderconfirmed', img: 'status/complete_paid.png'},
      {id: 9, title: 'Cancel', class: 'orderrejected', img: 'status/cancel.png'},
    ];
    return status.filter(e => e.id === id)[0];
  }

  getPaymentStatus(id: number){
    if(this.order.payableAmount - this.order.paidAmount === 0){
      id = 2;
    }
    const status = [
      {id: 0, title: 'Pending', class: 'orderstatus'},
      {id: 1, title: 'Partial Paid', class: 'orderstatus'},
      {id: 2, title: 'Completed', class: 'paymentstatus'},
    ];
    return status.filter(e => e.id === id)[0];
  }

  reOrder(){
    let cart: Array<Cart> = [];
    this.order.products?.forEach(pro => {
      this.getItemById(cart, pro, pro.items_id);
    });
    setTimeout(() => {
      this.storageService.updatemyCart(cart);
      this.router.navigate(['/checkout']);
    }, 1000);
  }

  getItemById(cart: Array<Cart>, pro: OrdersProducts, id: number){
    this.comboService.getItemById(id).subscribe((response: Response) => {
      if (response.statusCode != 200 && response.statusCode != 201) {
        this.sharedService.showMessage(1,this.sharedService.errorMessage(response.Error));
        this.router.navigate(['/']);
      } else {
        if(response.singleData){
          cart.push({
            itemId: pro.items_id,
            itemDetails: response.singleData,
            shop_id: this.order.shop_id,
            shop: response.singleData.shop,
            type: 'Item',
            quantity: pro.quantity,
            date: new Date().toISOString()
          });
        }
      }
    },
    error => {
      this.sharedService.showMessage(1,'Something Went Wrong');
    });
  }

  cancleOrder(){
    this.cancleStatus = true;
  }

  output(ev: number){
    this.cancleStatus = false;
    if(ev === 1){
      this.sharedService.back()
    }
  }
}
