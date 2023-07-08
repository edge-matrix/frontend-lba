import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Orders, Response } from '@models';
import { BookService, SharedService } from '@service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
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
  constructor(
    public sharedService: SharedService,
    private toastr: ToastrService,
    private bookService: BookService,
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
  }

  ngOnDestroy() {
    this.navSubscription.unsubscribe();
  }

  orderDetails(){
    this.bookService.orderDetails(this.orderId).subscribe((response: Response) => {
      if (response.statusCode != 200 && response.statusCode != 201) {
        this.toastr.error(this.sharedService.errorMessage(response.Error));
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
      {id: 0, title: 'Placed', class: 'cooking', img: ''},
      {id: 1, title: 'Pending', class: 'cooking', img: ''},
      {id: 2, title: 'Accepted', class: 'orderconfirmed', img: 'orderconfirmed.png'},
      {id: 3, title: 'Rejected', class: 'rejected', img: 'rejected.png'},
      {id: 4, title: 'In Process', class: 'cooking', img: ''},
      {id: 5, title: 'Cooking', class: 'cooking', img: 'cooking.png'},
      {id: 6, title: 'Ready To Serve', class: 'readytoserve', img: 'readytoserve.png'},
      {id: 7, title: 'Complete', class: 'orderconfirmed', img: ''},
      {id: 8, title: 'Complete & Paid', class: 'orderconfirmed', img: ''}
    ];
    return status.filter(e => e.id === id)[0];
  }
}
