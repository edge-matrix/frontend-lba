import { Component, OnInit } from '@angular/core';
import { Cart } from '@models';
import { SharedService } from '@service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart!: Array<Cart>;
  amount = 0;
  storageUrl = environment.storage;
  constructor(public sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.getCartDetails().subscribe((value) => {
      this.cart = value;
      this.amount = 0;
      this.cart.forEach(e => {
        this.amount += e.itemDetails.price * e.quantity;
      });
    });
  }

}
