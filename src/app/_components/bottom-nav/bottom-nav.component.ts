import { Component, OnInit } from '@angular/core';
import { SharedService } from '@service';

@Component({
  selector: 'bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss']
})
export class BottomNavComponent implements OnInit {

  menus = [
    {id: 0, title: 'Home', icon: 'fa-house', isActive: false, link: '/' },
    {id: 1, title: 'Fav', icon: 'fa-shop', isActive: false , link: '/favorite'},
    {id: 2, title: 'QR Code', icon: 'fa-qrcode', isActive: false , link: '/scanner'},
    {id: 3, title: 'Orders', icon: 'fa-concierge-bell', isActive: false , link: '/order-history'},
    {id: 4, title: 'Settings', icon: 'fa-user', isActive: false , link: '/settings'},
  ];
  constructor(public sharedService: SharedService) {
  }

  ngOnInit(): void {
    this.selectIndex(this.sharedService.sideMenuSelectedIndex);
  }

  selectIndex(isActive: number){
    this.menus.forEach(e => {
      if(e.id === isActive){
        e.isActive = true;
      }else{
        e.isActive = false;
      }
    });
  }

}
