import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrdersService, SharedService } from '@service';
import { ToastrService } from 'ngx-toastr';
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
    private toastr: ToastrService,
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
          this.toastr.error(this.sharedService.errorMessage(data.Error));
        } else {
          this.toastr.success(data.success);
          $('#close').click();
          this.newItemEvent.emit(1);
        }
      },
      error => {
        this.toastr.error('Something Went Wrong');
      });
    }
  }

  close(){
    $('#close').click();
    this.newItemEvent.emit(0);
  }
}

