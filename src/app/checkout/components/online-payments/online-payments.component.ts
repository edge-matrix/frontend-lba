import { Component, Input, OnInit } from '@angular/core';
import { BookService, SharedService } from '@service';
import { ToastrService } from 'ngx-toastr';
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
    private toastr: ToastrService,
    private bookService: BookService,
  ) {
  }

  ngOnInit() {
    this.orderDetails();
  }

  orderDetails(){
    this.bookService.orderDetails(this.orderId).subscribe((response: Response) => {
      if (response.statusCode != 200 && response.statusCode != 201) {
        this.toastr.error(this.sharedService.errorMessage(response.Error));
      } else {
        if(response.singleData){
          this.order = response.singleData;
          this.openPaymentModal();
        }
      }
    },
    error => {
      this.toastr.error('Something Went Wrong');
    });
  }

  openPaymentModal(){
    let transactionId = '';
    this.order.payment_details?.forEach(e => {
      if(e.paymentMethod === 4 && e.status === 0){
        transactionId = e.transactionId;
      }
    });
    const url = environment.paymentUrl + '?token=' + transactionId;
    window.location.href = url;
  }
}

