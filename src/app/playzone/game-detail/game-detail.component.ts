import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Game, Response } from '@models';
import { PlayzoneService, SharedService, StorageService } from '@service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss']
})
export class GameDetailComponent implements OnInit {

  slug = '';
  game!: Game;
  storageUrl = environment.storage;
  navSubscription!: Subscription;
  constructor(
    public sharedService: SharedService,
    private storageService: StorageService,
    private router: Router,
    private playService: PlayzoneService,
    private activeRoute: ActivatedRoute
  ) {
    this.sharedService.sideMenuSelectedIndex = 4;
    this.navSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.slug = this.activeRoute.snapshot.params['id'];
        this.getGameDetails();
      }
    });
  }

  ngOnInit(): void {
    this.slug = this.activeRoute.snapshot.params['id'];
    this.getGameDetails();
  }

  ngOnDestroy() {
    this.navSubscription.unsubscribe();
  }

  getGameDetails(){
    this.playService.getGame(this.slug).subscribe((response: Response) => {
      if (response.statusCode != 200 && response.statusCode != 201) {
        this.sharedService.showMessage(1,this.sharedService.errorMessage(response.Error));
      } else {
        if(response.singleData){
          this.game = response.singleData;
        }
      }
    },
    error => {
      this.sharedService.showMessage(1,'Something Went Wrong');
    });
  }

  startQuiz(){
    if(this.sharedService.user && this.sharedService.user.id !== 0){
      this.sharedService.playzoneUser = {
        isGuest: -1, // 0 => No, 1 => Yes
        name: '',
        slug: '',
        index: 0,
        isCompleted: false,
        score: 0
      };
      this.router.navigate(['/playzone/' + this.slug + '/quiz']);
    }else if(this.sharedService.playzoneUser.isGuest !== -1){
      this.sharedService.playzoneUser.index = 0;
      this.storageService.updateplayzoneUser(this.sharedService.playzoneUser);
      this.router.navigate(['playzone/' + this.slug + '/quiz']);
    }else{
      this.sharedService.playzoneUser = {
        isGuest: -1, // 0 => No, 1 => Yes
        name: '',
        slug: '',
        index: 0,
        isCompleted: false,
        score: 0
      };
      this.router.navigate(['/playzone/login'], { queryParams: { returnUrl: 'playzone/' + this.slug + '/quiz' }});
    }
  }
}
