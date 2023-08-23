import { Component, OnInit } from '@angular/core';
import { Shop, Response, Link } from '@models';
import { ComboDetailsService, SharedService } from '@service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'shop-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  shops: Array<Shop> = [];
  links: Array<Link> = [];
  page = 1;
  storageLink = environment.storage;
  constructor(
    private sharedService: SharedService,
    private comboDetailService: ComboDetailsService,

  ) {
  }
  ngOnInit(): void {
    this.getShops();
  }

  getShops(){
    this.comboDetailService.getShops(this.sharedService.myBunkDetails, this.page).subscribe((response: Response) => {
      if (response.statusCode != 200 && response.statusCode != 201) {
        this.sharedService.showMessage(1,this.sharedService.errorMessage(response.Error));
      } else {
        if(response.paginate){
          // this.shops = response.paginate.data;
          response.paginate.data.forEach(e => {
            this.shops.push(e);
          });
          this.links = response.paginate.links;
        }
      }
    },
    error => {
      this.sharedService.showMessage(1,'Something Went Wrong');
    });
  }

  paginate(id: number){
    this.page = id;
    this.getShops();
  }
}
