import { Component, OnInit } from '@angular/core';
import { SharedService } from '@service';

@Component({
  selector: 'bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss']
})
export class BottomNavComponent implements OnInit {

  menus = [
    { id: 0, title: 'Home', img: 'fa-home', isActive: false, link: '/' },
    { id: 1, title: 'Orders', img: 'fa-shopping-bag', isActive: false, link: '/orders' },
    { id: 2, title: 'Payments', img: 'fa-money-bill', isActive: false, link: '/payments' },
    { id: 4, title: 'Items', img: 'fa-pizza-slice', isActive: false, link: '/items' },
    { id: 6, title: 'Settings', img: 'fa-cogs', isActive: false, link: '/settings' },
  ];
  constructor(public sharedService: SharedService) {
  }

  ngOnInit(): void {
    const selectedMenu = this.sharedService.sideMenuSelectedIndex;
    this.menus.forEach(e => {
      if(e.id === selectedMenu){
        e.isActive = true;
      }else{
        e.isActive = false;
      }
    });
  }

}
