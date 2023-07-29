import { Component, OnInit } from '@angular/core';
import { Paginate, Link, Response, Orders } from '@models';
import { OrdersService, SharedService } from '@service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'current-order',
  templateUrl: './current-order.component.html',
  styleUrls: ['./current-order.component.scss']
})
export class CurrentOrderComponent implements OnInit {

  data!: Orders;
  page = 1;
  storageUrl = environment.storage;
  constructor(public sharedService: SharedService,
    private orderService: OrdersService,
    ) {
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
        this.sharedService.showMessage(1,this.sharedService.errorMessage(response.Error));
      } else {
        if(response.paginate){
          let paginate: Paginate = response?.paginate;
          paginate.data.forEach(e => {
            const timeParams = new Date(e.booking_details.bookingDate +' '+ e.booking_details.startTime).getTime() <= new Date().getTime();
            if(e.status !== 7 && e.status !==8 && e.status !== 3 && timeParams)
            {
              this.data = e;
            }
          });
        }
      }

    },
    () => {
      this.sharedService.showMessage(1,'Something Went Wrong');

    });
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
      {id: 8, title: 'Complete & Paid', class: 'completed'},
      {id: 9, title: 'Cancled', class: 'rejected'},
    ];
    return status.filter(e => e.id === id)[0];
  }
}