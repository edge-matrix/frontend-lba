import { Injectable } from '@angular/core';
import { OrderStatus } from '@models';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  orderStatus: Array<OrderStatus> = [
    {id: 0, label: 'Placed', slug:'placed', status: true},
    {id: 1, label: 'Pending', slug:'pending', status: true},
    {id: 2, label: 'Accepted', slug:'accepted', status: true},
    {id: 3, label: 'Rejected', slug:'rejected', status: true},
    {id: 4, label: 'In Process', slug:'in_process', status: true},
    {id: 5, label: 'Cooking', slug:'cooking', status: true},
    {id: 6, label: 'Ready To Serve', slug:'ready_to_serve', status: true},
    {id: 7, label: 'Complete', slug:'completed', status: true},
    {id: 8, label: 'Completed & Paid', slug:'completed_and_paid', status: true},
  ];

  quickAccessOrderClass = [
    {id: 0, activeClass: 'cookingheaderbtn', inActiveClass: 'newcookingheaderbtn', activeImg: 'placed-white', inActiveImg: 'placed', icon: 'fa-weight-hanging'},
    {id: 1, activeClass: 'cookingheaderbtn', inActiveClass: 'newcookingheaderbtn', activeImg: 'pending-white', inActiveImg: 'pending', icon: 'fa-history'},
    {id: 2, activeClass: 'readyheaderbtn', inActiveClass: 'newreadyheaderbtn', activeImg: 'accepted-white', inActiveImg: 'accepted', icon: 'fa-thumbs-up'},
    {id: 3, activeClass: 'cancelheaderbtn', inActiveClass: 'newcancelheaderbtn', activeImg: 'rejected-white', inActiveImg: 'rejected', icon: 'fa-times'},
    {id: 4, activeClass: 'cookingheaderbtn', inActiveClass: 'newcookingheaderbtn', activeImg: 'in_process-white', inActiveImg: 'in_process', icon: 'fa-clock'},
    {id: 5, activeClass: 'cookingheaderbtn', inActiveClass: 'newcookingheaderbtn', activeImg: 'cooking-white', inActiveImg: 'cooking', icon: 'fa-hourglass-half'},
    {id: 6, activeClass: 'readyheaderbtn', inActiveClass: 'newreadyheaderbtn', activeImg: 'ready_to_serve-white', inActiveImg: 'ready_to_serve', icon: 'fa-utensils'},
    {id: 7, activeClass: 'readyheaderbtn', inActiveClass: 'newreadyheaderbtn', activeImg: 'completed-white', inActiveImg: 'completed', icon: 'fa-check'},
    {id: 8, activeClass: 'readyheaderbtn', inActiveClass: 'newreadyheaderbtn', activeImg: 'completed-white', inActiveImg: 'completed', icon: 'fa-check'},
  ];

  badgeOrderClass = [
    {id: 0, class: 'pending'},
    {id: 1, class: 'pending'},
    {id: 2, class: 'accepted'},
    {id: 3, class: 'rejected'},
    {id: 4, class: 'pending'},
    {id: 5, class: 'cooking'},
    {id: 6, class: 'completed'},
    {id: 7, class: 'completed'},
    {id: 8, class: 'completed'}
  ];

  btnOrderClass = [
    {id: 0, btn: 'pendingbtn'},
    {id: 1, btn: 'pendingbtn'},
    {id: 2, btn: 'acceptbtn'},
    {id: 3, btn: 'rejectbtn'},
    {id: 4, btn: 'preparingbtn'},
    {id: 5, btn: 'cookbtn'},
    {id: 6, btn: 'readybtn'},
    {id: 7, btn: 'completebtn'},
    {id: 8, btn: 'completebtn'}
  ];

  btnByStatus = [
    {id: 0, btns: [2, 3]},
    {id: 1, btns: [2, 3]},
    {id: 2, btns: [5]},
    {id: 3, btns: []},
    {id: 4, btns: [5]},
    {id: 5, btns: [6]},
    {id: 6, btns: [7]},
    {id: 7, btns: [8]},
    {id: 8, btns: []},
  ];

  paymentStatus = [
    {id: 0, label: 'Pending', slug:'pending', class: 'orderstatus', status: true},
    {id: 1, label: 'Partial Paid', slug:'partial_paid', class: 'paymentstatus', status: true},
    {id: 2, label: 'Paid', slug:'paid', class: 'paymentstatus', status: true},
  ];
  constructor() {
  }
}
