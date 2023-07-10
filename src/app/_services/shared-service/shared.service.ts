import { Injectable } from '@angular/core';
import { Location, User } from '@models';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Cart } from '@models';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  version = '23.07.11.01';
  user: User;
  sideMenuSelectedIndex = 0;
  public isLoading = new BehaviorSubject(false);
  mySearchHistory: Array<string>;
  myLocation : Location;
  myLocationHistory: Array<Location>;
  private cart: BehaviorSubject<Array<Cart>>;

  constructor() {
    this.user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    this.mySearchHistory = JSON.parse(localStorage.getItem('mySearchHistory') || 'null')||[];
    this.myLocation = JSON.parse(localStorage.getItem('myLocation') || 'null')||[];
    this.myLocationHistory = JSON.parse(localStorage.getItem('myLocationHistory') || 'null')||[];
    this.cart = new BehaviorSubject<Array<Cart>>( JSON.parse(localStorage.getItem('cart') || 'null')|| []);
  }

  getCartDetails(): Observable<Array<Cart>> {
    return this.cart.asObservable();
  }
  setCartDetails(newValue: Array<Cart>): void {
    this.cart.next(newValue);
  }

  errorMessage(error:string|undefined){
    return JSON.stringify(error).replace('{','').replace('}','').replace('[','').replace(']','');
  }
}
