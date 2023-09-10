import { Component, Input, OnInit } from '@angular/core';
import { Shop } from '@models';

@Component({
  selector: 'shop-overview',
  templateUrl: './shop-overview.component.html',
  styleUrls: ['./shop-overview.component.scss']
})
export class ShopOverviewComponent implements OnInit {

  @Input() shop!: Shop;
  constructor() { }

  ngOnInit(): void {
    console.log(this.shop);
  }

  socialLinkIcon(label: string, value: string){
    if(label === 'whatsappNumber'){
      return [
        'fa-whatsapp', 'https://wa.me/'+ value +'?text=Hi Shop, I want to connect with you.'
      ];
    }else if(label === 'contactNumber'){
      return [
        'fa-phone', 'tel:'+ value
      ];
    }else if(label === 'instagramId'){
      return [
        'fa-instagram', value
      ];
    }else if(label === 'facebookId'){
      return [
        'fa-facebook-f', value
      ];
    }
    return ['',''];
  }

}
