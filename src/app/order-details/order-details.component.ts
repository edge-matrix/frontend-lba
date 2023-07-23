import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Cart, Orders, OrdersProducts, Response } from '@models';
import { BookService, ComboDetailsService, OrdersService, SharedService, StorageService } from '@service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Location as Loc } from '@angular/common';

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
  constructor(
    public sharedService: SharedService,
    private storageService: StorageService,
    private toastr: ToastrService,
    private bookService: BookService,
    private comboService: ComboDetailsService,
    private orderService: OrdersService,
    private router: Router,
    private location: Loc,
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
  }

  ngOnDestroy() {
    this.navSubscription.unsubscribe();
  }

  orderDetails(){
    this.bookService.orderDetails(this.orderId).subscribe((response: Response) => {
      if (response.statusCode != 200 && response.statusCode != 201) {
        this.toastr.error(this.sharedService.errorMessage(response.Error));
        this.router.navigate(['/']);
      } else {
        if(response.singleData){
          this.order = response.singleData;
        }
      }
    },
    error => {
      this.toastr.error('Something Went Wrong');
    });
  }

  getStatus(id: number){
    const status = [
      {id: 0, title: 'Placed', class: 'ordercooking', img: ''},
      {id: 1, title: 'Pending', class: 'ordercooking', img: 'orderconfirmed.png'},
      {id: 2, title: 'Accepted', class: 'orderconfirmed', img: 'orderconfirmed.png'},
      {id: 3, title: 'Rejected', class: 'orderrejected', img: 'rejected.png'},
      {id: 4, title: 'In Process', class: 'ordercooking', img: ''},
      {id: 5, title: 'Cooking', class: 'ordercooking', img: 'cooking.png'},
      {id: 6, title: 'Ready To Serve', class: 'orderreadytoserve', img: 'readytoserve.png'},
      {id: 7, title: 'Complete', class: 'orderconfirmed', img: 'orderconfirmed.png'},
      {id: 8, title: 'Complete & Paid', class: 'orderconfirmed', img: 'orderconfirmed.png'},
      {id: 9, title: 'Cancled', class: 'orderrejected', img: 'rejected.png'},
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
        this.toastr.error(this.sharedService.errorMessage(response.Error));
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
      this.toastr.error('Something Went Wrong');
    });
  }

  cancleOrder(){
    this.cancleStatus = true;
  }

  output(ev: number){
    this.cancleStatus = false;
    if(ev === 1){
      this.location.back()
    }
  }
}
