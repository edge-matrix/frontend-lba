import { Injectable } from '@angular/core';
import { Cart, Fav, Location } from '@models';
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

  updateFav(data: Array<Fav>){
    localStorage.setItem('userFav', JSON.stringify(data));
    this.sharedService.userFav = JSON.parse(localStorage.getItem('userFav') || 'null');
  }

  updatemySearchHistory(data: Array<{title: string, url: string, type: number}>){
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

  updateplayzoneUser(data: any){
    localStorage.setItem('playzoneUser', JSON.stringify(data));
    this.sharedService.playzoneUser = JSON.parse(localStorage.getItem('playzoneUser') || 'null')||[];
  }

  removeStorage(){
    localStorage.removeItem("currentUser");
    localStorage.removeItem("mySearchHistory");
    localStorage.removeItem("myLocation");
    localStorage.removeItem("myLocationHistory");
    localStorage.removeItem("cart");
    localStorage.removeItem("userFav");
    localStorage.removeItem("playzoneUser");
  }
}
