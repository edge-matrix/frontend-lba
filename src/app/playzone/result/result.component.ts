import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '@service';

@Component({
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  constructor(
    public sharedService: SharedService,
    private router: Router,
  ) {
    if(this.sharedService.playzoneUser.isGuest === -1){
      this.router.navigate(['/playzone']);
    }
  }

  ngOnInit(): void {
  }

}
