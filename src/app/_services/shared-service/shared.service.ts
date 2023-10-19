import { Injectable } from '@angular/core';
import { Fav, Location, User } from '@models';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Cart } from '@models';
import { Location as Loc } from '@angular/common';
import { ToastService } from '@service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  version = '23.10.20.01';
  user: User;
  userFav: Array<Fav> = [];
  sideMenuSelectedIndex = 0;
  public isLoading = new BehaviorSubject(false);
  mySearchHistory: Array<{title: string, url: string, type: number}>;
  myLocation : Location;
  myLocationHistory: Array<Location>;
  myBunkDetails: {
    location: Location;
    radius?: number;
    type: number;
    category?: number;
    search?: string;
  } = {
    location: { lat: 0, lng: 0 },
    radius: 5,
    type: 0,
    category: 0,
  };
  private cart: BehaviorSubject<Array<Cart>>;
  bottomBadgeVisible = {
    'cart': 1,
    'order': 1,
  };

  //Playzone Variable
  playzoneUser = {
    isGuest: -1, // 0 => No, 1 => Yes
    name: '',
    slug: '',
    index: 0,
    isCompleted: false,
    score: 0
  };

  constructor(
    private location: Loc,
    private toastService: ToastService
  ) {
    this.user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    this.userFav = JSON.parse(localStorage.getItem('userFav') || 'null')||[];
    this.mySearchHistory = JSON.parse(localStorage.getItem('mySearchHistory') || 'null')||[];
    this.myLocation = JSON.parse(localStorage.getItem('myLocation') || 'null')||[];
    this.myLocationHistory = JSON.parse(localStorage.getItem('myLocationHistory') || 'null')||[];
    this.cart = new BehaviorSubject<Array<Cart>>( JSON.parse(localStorage.getItem('cart') || 'null')|| []);
    this.playzoneUser = JSON.parse(localStorage.getItem('playzoneUser') || 'null')||[];
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

  back(){
    this.location.back();
  }

  showMessage(type: number, msg: string){
    this.toastService.show(type, msg);
  }
}
