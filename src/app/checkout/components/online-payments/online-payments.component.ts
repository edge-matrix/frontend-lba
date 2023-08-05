import { Component, Input, OnInit } from '@angular/core';
import { BookService, SharedService } from '@service';

import { Orders, Response } from '@models';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'online-payments',
  templateUrl: './online-payments.component.html',
})
export class OnlinePaymentsComponent implements OnInit {

  @Input() orderId!: string;
  order!: Orders;
  constructor(
    public sharedService: SharedService,

    private bookService: BookService,
  ) {
  }

  ngOnInit() {
    this.orderDetails();
  }

  orderDetails(){
    this.bookService.orderDetails(this.orderId).subscribe((response: Response) => {
      if (response.statusCode != 200 && response.statusCode != 201) {
        this.sharedService.showMessage(1,this.sharedService.errorMessage(response.Error));
      } else {
        if(response.singleData){
          this.order = response.singleData;
          this.openPaymentModal();
        }
      }
    },
    error => {
      this.sharedService.showMessage(1,'Something Went Wrong');
    });
  }

  // openPaymentModal(){
  //   let transactionId = '';
  //   this.order.payment_details?.forEach(e => {
  //     if(e.paymentMethod === 4 && e.status === 0){
  //       transactionId = e.transactionId;
  //     }
  //   });
  //   const url = environment.paymentUrl + '?token=' + transactionId;
  //   window.location.href = url;
  // }

  openPaymentModal(){
    let transactionId = '';
    this.order.payment_details?.forEach(e => {
      if(e.paymentMethod === 4 && e.status === 0){
        transactionId = e.transactionId;
      }
    });
    const url = environment.paymentUrl + transactionId;
    window.location.href = url;
  }
}

