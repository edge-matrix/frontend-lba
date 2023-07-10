import { Injectable } from '@angular/core';
import { Cart, Location } from '@models';
import { SharedService } from '@service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private sharedService: SharedService) {
  }

  updateUser(data: any){
    localStorage.setItem('currentUser', JSON.stringify(data));
    this.sharedService.user = JSON.parse(localStorage.getItem('currentUser') || 'null');
  }

  updatemySearchHistory(data: Array<string>){
    localStorage.setItem('mySearchHistory', JSON.stringify(data));
    this.sharedService.mySearchHistory = JSON.parse(localStorage.getItem('mySearchHistory') || 'null')||[];
  }

  updatemyLocation(data: { lng: number; lat: number; }){
    localStorage.setItem('myLocation', JSON.stringify(data));
    this.sharedService.myLocation = JSON.parse(localStorage.getItem('myLocation') || 'null');
  }

  updatemyLocationHistory(data: Array<Location>){
    localStorage.setItem('myLocationHistory', JSON.stringify(data));
    this.sharedService.myLocationHistory = JSON.parse(localStorage.getItem('myLocationHistory') || 'null')||[];
  }

  updatemyCart(data: Array<Cart>){
    localStorage.setItem('cart', JSON.stringify(data));
    this.sharedService.setCartDetails(data);
  }

  removeStorage(){
    localStorage.removeItem("currentUser");
    localStorage.removeItem("mySearchHistory");
    localStorage.removeItem("myLocation");
    localStorage.removeItem("myLocationHistory");
    localStorage.removeItem("cart");
  }
}
