import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game, Link, Paginate, Response } from '@models';
import { PlayzoneService, SharedService } from '@service';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {

  gameList: Array<Game> = [];
  links!: Array<Link>;
  lastPage = 0;
  page = 1;
  total = 0;
  storageUrl = environment.storage;
  constructor(public sharedService: SharedService,
    private playService: PlayzoneService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.sharedService.sideMenuSelectedIndex = 4;
    this.getGameList();
  }

  getGameList(){
    this.playService.gameList(this.page).subscribe((response: Response) => {
      if (response.statusCode != 200 && response.statusCode != 201) {
        this.sharedService.showMessage(1,this.sharedService.errorMessage(response.Error));
        this.router.navigate(['/settings']);
      } else {
        if(response.paginate){
          let paginate: Paginate = response?.paginate;
          this.total = paginate.total?paginate.total:0;
          // this.gameList = paginate.data;
          paginate.data.forEach(e => {
            this.gameList.push(e);
          });
          this.links = paginate.links;
          this.lastPage = paginate.last_page?paginate.last_page:0;
        }
      }

    },
    error => {
      this.sharedService.showMessage(1,'Something Went Wrong');

    });
  }

  paginate(id: number){
    this.page = id;
    this.getGameList();
  }

}
