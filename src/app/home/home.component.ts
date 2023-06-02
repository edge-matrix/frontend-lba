import { Component, OnInit } from '@angular/core';
import { OrderService, SharedService, StorageService } from '@service';
import { Link, Orders, Paginate, Response } from '@models';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  page = 1;
  storageUrl = environment.storage;
  data!: Array<Orders>;
  ordersId: Array<{id: number,orderId: string, status: number, isActive: boolean}> = [];
  filter: {selectedOrder: string, orderStatus: number, orderBy: string, orderMode: string} = {
    selectedOrder: '',
    orderStatus: -1, //TODO:: Status will be updated in numbers
    orderBy: 'created_at',
    orderMode: 'desc'
  };
  links!: Link[];

  isOffCanvasOpen = false;
  type = 0;
  selectedOrder!: Orders;
  constructor(public sharedService: SharedService,
    private orderService: OrderService,
    private toastr: ToastrService) {
    this.sharedService.sideMenuSelectedIndex = 0;
  }

  ngOnInit(): void {
    this.currentOrders();
    this.orderIds();
  }

  currentOrders(){
    this.data = [];
    this.links = [];
    this.orderService.currentOrder(this.page, this.filter).subscribe((data: Response) => {
      if (data.statusCode != 200 && data.statusCode != 201) {
        this.toastr.error(this.sharedService.errorMessage(data.Error));
      } else {
        if(data.paginate){
          let paginate: Paginate = data.paginate;
          this.data = paginate.data;
          this.links = paginate.links;
        }
      }
    },
    error => {
      this.toastr.error('Something Went Wrong');
    });
  }

  paginate(page: number){
    this.page = page;
    this.currentOrders();
  }

  orderIds(){
    this.ordersId = [];
    this.orderService.currentOrderIds().subscribe((data: Response) => {
      if (data.statusCode != 200 && data.statusCode != 201) {
        this.toastr.error(this.sharedService.errorMessage(data.Error));
      } else {
        if(data.data){
          data.data.forEach((e: {id: number,orderId: string, status: number, isActive: boolean})=> {
            e.isActive = false;
            this.ordersId.push(e)
          });
        }
      }
    },
    error => {
      this.toastr.error('Something Went Wrong');
    });
  }

  updateSelectedId(ev: string){
    this.filter.selectedOrder = ev;
    this.currentOrders();
  }

  orderOutput(ev: any){
    //Action: 0 => Open Canvas, 1 => Update Status, 2 => Add New Item
    if(ev.action === 0){
      this.selectedOrder = this.data.filter(e => e.id === ev.orderId)[0];
      this.isOffCanvasOpen = true;
    }else if(ev.action === 1){
      this.selectedOrder = this.data.filter(e => e.id === ev.orderId)[0];
      this.updateStatus(ev.status);
    }else if(ev.action === 2){
      this.selectedOrder = this.data.filter(e => e.id === ev.orderId)[0];
      this.type = 1;
    }
  }

  canvasOutput(ev: any){
    //Action: 0 => Nothing, 1 => Update Status, 2 => Add New Item
    this.isOffCanvasOpen = false;
    if(ev.action === 1){
      this.selectedOrder = this.data.filter(e => e.id === ev.orderId)[0];
      this.updateStatus(ev.status);
    }else if(ev.action === 2){
      this.selectedOrder = this.data.filter(e => e.id === ev.orderId)[0];
      this.type = 1;
    }
  }

  updateChanges(ev: any){
    //ev: 0 => No updates, 1 => Updates
    this.type = 0;
    if(ev === 1){
      this.currentOrders();
      this.orderIds();
    }
  }

  //Update Status Codes
  updateStatus(status: number){
    if(status === 3){
      this.type = 2;
    }else if(status === 7){
      this.markAsComplete(0);
    }else{
      this.orderService.updateStatus(this.selectedOrder.id, status).subscribe((data: Response) => {
        if (data.statusCode != 200 && data.statusCode != 201) {
          this.toastr.error(this.sharedService.errorMessage(data.Error));
        } else {
          this.toastr.success(data.success);
          this.updateChanges(1);
        }
      },
      error => {
        this.toastr.error('Something Went Wrong');
      });
    }
  }

  markAsComplete(skip: number){
    const medium = this.selectedOrder.booking_details?.medium;
    if(medium && skip === 0 && this.selectedOrder.user_id === parseInt(medium)){
      this.type = 4;
      return;
    }
    if(this.selectedOrder.payableAmount > 0){
      setTimeout( () => {
        this.type = 3;
      }, 1000);
    }else{
      this.updateStatus(8);
    }
  }

  userUpdate(ev: any){
    this.type = 0;
    if(ev !== 0){
      this.selectedOrder.user_id = ev;
      this.markAsComplete(1);
    }
  }
}
