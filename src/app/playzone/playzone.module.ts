import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayzoneRoutingModule } from './playzone-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedComponentModule } from 'src/app/_shared/shared.module';
import { CommonComponentModule } from '../_components/common-component.module';
import { GameListComponent, GameDetailComponent, QuizPageComponent, GuestLoginComponent, ResultComponent } from '.';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    GameListComponent,
    GameDetailComponent,
    QuizPageComponent,
    GuestLoginComponent,
    ResultComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PlayzoneRoutingModule,
    SharedComponentModule,
    CommonComponentModule,
    InfiniteScrollModule
  ]
})
export class PlayzoneModule { }
