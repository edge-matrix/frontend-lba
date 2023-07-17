import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '@service';

@Component({
  selector: 'home-top-filter',
  templateUrl: './top-filter.component.html',
  styleUrls: ['./top-filter.component.scss']
})
export class TopFilterComponent implements OnInit {

  options = [
    {title: 'Favourites', image: 'filter_fav.png', link: '/favorite', type: 1},
    {title: 'Location', image: 'filter_loc.png', link: '/shops', type: 2},
    {title: 'Trending', image: 'filter_trend.png', link: '/shops', type: 3},
    {title: 'More', image: 'filter_more.png', link: '/shops', type: 4}
  ];
  constructor(
    private sharedService: SharedService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  update(type: number, link: string){
    this.sharedService.myBunkDetails.type = type;
    this.router.navigate([link]);
  }

}
