import { Component, OnInit } from '@angular/core';
import { Paginate, Link, Response, Orders, Cart } from '@models';
import { OrdersService, SharedService, StorageService } from '@service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';


@Component({
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  data!: Array<Orders>;
  links!: Array<Link>;
  page = 1;
  storageUrl = environment.storage;
  constructor(public sharedService: SharedService,
    private storageService: StorageService,
    private orderService: OrdersService,
    private toastr: ToastrService) {
    this.sharedService.sideMenuSelectedIndex = 3;
  }

  ngOnInit(): void {
    if(this.sharedService.user && this.sharedService.user.id !== 0){
      this.orderList();
    }
  }

  orderList(){
    this.orderService.getOrder(this.page).subscribe((response: Response) => {
      if (response.statusCode != 200 && response.statusCode != 201) {
        this.toastr.error(this.sharedService.errorMessage(response.Error));
      } else {
        if(response.paginate){
          let paginate: Paginate = response?.paginate;
          this.data = paginate.data;
          this.links = paginate.links;
        }
      }

    },
    () => {
      this.toastr.error('Something Went Wrong');

    });
  }

  paginate(id: number){
    this.page = id;
    this.orderList();
  }

  getStatus(id: number){
    const status = [
      {id: 0, title: 'Placed', class: 'pending'},
      {id: 1, title: 'Pending', class: 'pending'},
      {id: 2, title: 'Accepted', class: 'accepted'},
      {id: 3, title: 'Rejected', class: 'rejected'},
      {id: 4, title: 'In Process', class: 'pending'},
      {id: 5, title: 'Cooking', class: 'cooking'},
      {id: 6, title: 'Ready To Serve', class: 'completed'},
      {id: 7, title: 'Complete', class: 'completed'},
      {id: 8, title: 'Complete & Paid', class: 'completed'}
    ];
    return status.filter(e => e.id === id)[0];
  }

  reOrder(id: number){
    const order =  this.data.filter(e => e.id === id)[0];
    let cart: Array<Cart> = [];
    if(order){
      order.products?.forEach(pro => {
        if(pro.item && order.shop){
          cart.push({
            itemId: pro.items_id,
            itemDetails: pro.item,
            shop_id: order.shop_id,
            shop: order.shop,
            type: 'Item',
            quantity: pro.quantity,
            date: new Date().toISOString()
          });
        }
      });
      this.storageService.updatemyCart(cart);
    }
  }

}
