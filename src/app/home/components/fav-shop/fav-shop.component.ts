import { Component, OnInit } from '@angular/core';
import { Shop, Response } from '@models';
import { ComboDetailsService, SharedService } from '@service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'home-fav-shop',
  templateUrl: './fav-shop.component.html',
  styleUrls: ['./fav-shop.component.scss']
})
export class FavShopComponent implements OnInit {

  shops: Array<Shop> = [];
  storageLink = environment.storage;
  constructor(
    private sharedService: SharedService,
    private comboDetailService: ComboDetailsService,

  ) {
  }
  ngOnInit(): void {
    this.favShop();
  }

  favShop(){
    this.comboDetailService.getFavShop().subscribe((response: Response) => {
      if (response.statusCode != 200 && response.statusCode != 201) {
        this.sharedService.showMessage(1,this.sharedService.errorMessage(response.Error));
      } else {
        if(response.data){
          this.shops = response.data
        }
      }
    },
    error => {
      this.sharedService.showMessage(1,'Something Went Wrong');
    });
  }
}
