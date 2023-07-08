import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home-top-filter',
  templateUrl: './top-filter.component.html',
  styleUrls: ['./top-filter.component.scss']
})
export class TopFilterComponent implements OnInit {

  options = [
    {title: 'Favourites', image: 'filter_fav.png', link: '/favorite'},
    {title: 'Location', image: 'filter_loc.png', link: '/shops'},
    {title: 'Trending', image: 'filter_trend.png', link: '/shops'},
    {title: 'More', image: 'filter_more.png', link: '/shops'}
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
