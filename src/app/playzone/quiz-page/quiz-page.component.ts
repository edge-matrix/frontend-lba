import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Game, Question, Response } from '@models';
import { PlayzoneService, SharedService, StorageService } from '@service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.scss']
})
export class QuizPageComponent implements OnInit {

  slug = '';
  game!: Game;
  questions: Array<Question> = [];
  storageUrl = environment.storage;
  navSubscription!: Subscription;

  //Quiz Related Options
  currentIndex = 0;
  selectedQuestion!: Question;
  score = 0;

  constructor(
    public sharedService: SharedService,
    private storageService: StorageService,
    private router: Router,
    private playService: PlayzoneService,
    private activeRoute: ActivatedRoute
  ) {
    this.sharedService.sideMenuSelectedIndex = 4;
    if(this.sharedService.playzoneUser.isGuest === -1){
      this.router.navigate(['/playzone']);
    }
    this.navSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.slug = this.activeRoute.snapshot.params['id'];
        this.getGameDetails();
      }
    });
  }

  ngOnInit(): void {
    this.slug = this.activeRoute.snapshot.params['id'];
    this.sharedService.playzoneUser.slug = this.slug;
    this.sharedService.playzoneUser.isCompleted = false;
    if(this.sharedService.playzoneUser.slug === this.slug && !this.sharedService.playzoneUser.isCompleted){
      this.currentIndex = this.sharedService.playzoneUser.index;
    }
    this.storageService.updateplayzoneUser(this.sharedService.playzoneUser);
    this.sharedService.playzoneUser.score = 0;
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
          this.questions = this.game.question;
          this.setSelectQuestion();
        }
      }
    },
    error => {
      this.sharedService.showMessage(1,'Something Went Wrong');
    });
  }

  setSelectQuestion(){
    this.selectedQuestion = this.questions[this.currentIndex];
  }

  checkAnswer(id: number){
    if(id === this.selectedQuestion.answer.quiz_option_id){
      this.sharedService.playzoneUser.score += this.selectedQuestion.points;
      this.sharedService.playzoneUser.index = this.currentIndex;
      this.storageService.updateplayzoneUser(this.sharedService.playzoneUser);
    }
    if(this.currentIndex + 1 < this.questions.length){
      this.currentIndex = this.currentIndex + 1;
    }else if(this.currentIndex + 1 === this.questions.length){
      this.saveScore();
      return;
    }
    setTimeout(() => {
      this.setSelectQuestion();
    }, 500);
  }

  saveScore(){
    const data = {
      name: this.sharedService.playzoneUser.name,
      user_id: null,
      isGuest: this.sharedService.playzoneUser.isGuest,
      slug: this.sharedService.playzoneUser.slug,
      score: this.sharedService.playzoneUser.score,
      refered: null
    };
    this.playService.saveScore(data).subscribe((response: Response) => {
      if (response.statusCode != 200 && response.statusCode != 201) {
        this.sharedService.showMessage(1,this.sharedService.errorMessage(response.Error));
      } else {
        if(response.success){
          this.sharedService.playzoneUser.isCompleted = true;
          this.storageService.updateplayzoneUser(this.sharedService.playzoneUser);
          this.router.navigate(['/playzone/'+ this.slug +'/result']);
        }
      }
    },
    error => {
      this.sharedService.showMessage(1,'Something Went Wrong');
    });
  }

}
