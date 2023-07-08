import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'home-order-type',
  templateUrl: './order-type.component.html',
  styleUrls: ['./order-type.component.scss']
})
export class OrderTypeComponent implements OnInit {

  @Input() type!: number;
  @Output() newItemEvent = new EventEmitter<number>();
  orderTypes = [
    {id: 0, title: 'Dine In', isActive: false},
    {id: 1, title: 'Pre-Cooked', isActive: false},
    {id: 2, title: 'Delivery', isActive: false},
  ];
  constructor() { }

  ngOnInit(): void {
    this.updateOrderType(this.type);
  }

  updateOrderType(id: number){
    this.orderTypes.forEach(e => {
      if(e.id === id){
        e.isActive = true;
      }else{
        e.isActive = false;
      }
    });
    this.newItemEvent.emit(id);
  }

}
