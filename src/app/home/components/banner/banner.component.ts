import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  coverImages = [
    'assets/imagefolder/sliderimage1.png',
    'assets/imagefolder/sliderimage2.png',
    'assets/imagefolder/sliderimage3.png',
    'assets/imagefolder/sliderimage4.png',
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
