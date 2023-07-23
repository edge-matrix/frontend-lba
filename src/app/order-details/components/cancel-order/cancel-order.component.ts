import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrdersService, SharedService } from '@service';

import { Response } from '@models';

@Component({
  selector: 'cancel-order',
  templateUrl: './cancel-order.component.html',
  styleUrls: ['./cancel-order.component.scss']
})
export class CancleOrderComponent implements OnInit {

  @Input() orderId!: number;
  @Output() newItemEvent = new EventEmitter<number>();
  reasons = [
    "I didn't find this order useful",
    'Order placed by mistake',
    'Cost is too high',
    "Didn't receive the order in expected time",
    'Other Reason'
  ];
  reason = '';
  comment = '';
  constructor(
    public sharedService: SharedService,

    private orderService: OrdersService,
  ) {
  }

  ngOnInit(): void {
    $('#openModal').click();
  }

  reject(){
    if(this.reason !== ''){
      this.orderService.cancelOrder(this.orderId, this.reason, this.comment).subscribe((data: Response) => {
        if (data.statusCode != 200 && data.statusCode != 201) {
          this.sharedService.showMessage(1,this.sharedService.errorMessage(data.Error));
        } else {
          if(data.success){
            this.sharedService.showMessage(0,data.success);
          }
          $('#close').click();
          this.newItemEvent.emit(1);
        }
      },
      error => {
        this.sharedService.showMessage(1,'Something Went Wrong');
      });
    }
  }

  close(){
    $('#close').click();
    this.newItemEvent.emit(0);
  }
}

