import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  coverImages = [
    'https://i.pinimg.com/originals/2b/de/de/2bdede0647e3cdf75b44ea33723201d9.jpg',
    'https://images6.alphacoders.com/462/thumb-1920-462371.jpg',
    'https://images5.alphacoders.com/343/thumb-1920-343645.jpg',
    'https://cdn.wallpapersafari.com/24/98/dwMtqD.jpg'
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
