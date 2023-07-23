import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { Shop, Response, Items } from '@models';
import { ComboDetailsService, SharedService } from '@service';

import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';


@Component({
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  slug = '';
  shops!: Shop;
  items: Array<Items> = [];
  catId = 0;
  navSubscription!: Subscription;
  storageUrl = environment.storage;
  constructor(
    public sharedService: SharedService,

    private comboDetailService: ComboDetailsService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.sharedService.sideMenuSelectedIndex = 1;
    this.navSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.slug = this.activeRoute.snapshot.params['slug'];
        this.getShopDetails();
      }
    });
  }

  ngOnInit(): void {
    this.slug = this.activeRoute.snapshot.params['slug'];
    this.getShopDetails();
  }

  ngOnDestroy() {
    this.navSubscription.unsubscribe();
  }

  getShopDetails(){
    this.comboDetailService.getShopDetails(this.slug).subscribe((response: Response) => {
      if (response.statusCode != 200 && response.statusCode != 201) {
        this.sharedService.showMessage(1,this.sharedService.errorMessage(response.Error));
      } else {
        if(response.singleData){
          this.shops = response.singleData;
          this.updateCat({catId: this.catId, search: ''});
        }
      }
    },
    error => {
      this.sharedService.showMessage(1,'Something Went Wrong');
    });
  }

  updateCat(ev: {catId: number, search: string}){
    this.catId = ev.catId;
    this.items = [];
    this.shops.items.forEach(e => {
      if(e.items_categories_id === this.catId || this.catId === 0){
        if(ev.search === '' || e.name.toLowerCase().match(ev.search.toLowerCase())){
          this.items.push(e);
        }
      }
    });
  }

}
