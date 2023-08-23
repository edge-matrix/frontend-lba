import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameDetailComponent, GameListComponent, GuestLoginComponent, QuizPageComponent, ResultComponent } from '.';

const routes: Routes = [
  { path: '', component: GameListComponent  },
  { path: 'login', component: GuestLoginComponent  },
  { path: ':id', component: GameDetailComponent  },
  { path: ':id/quiz', component: QuizPageComponent  },
  { path: ':id/result', component: ResultComponent  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayzoneRoutingModule { }
