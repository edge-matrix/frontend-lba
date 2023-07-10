import { Component, OnInit } from '@angular/core';
import { Shop, Response, Link } from '@models';
import { ComboDetailsService, SharedService } from '@service';
import { ToastrService } from 'ngx-toastr';
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
    private toastr: ToastrService
  ) {
  }
  ngOnInit(): void {
    this.getShops();
  }

  getShops(){
    this.comboDetailService.getShops(1).subscribe((response: Response) => {
      if (response.statusCode != 200 && response.statusCode != 201) {
        this.toastr.error(this.sharedService.errorMessage(response.Error));
      } else {
        if(response.paginate){
          this.shops = response.paginate.data;
          this.links = response.paginate.links;
        }
      }
    },
    error => {
      this.toastr.error('Something Went Wrong');
    });
  }

  paginate(id: number){
    this.page = id;
    this.getShops();
  }
}
