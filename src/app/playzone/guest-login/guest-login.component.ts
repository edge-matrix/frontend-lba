import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '@service';

@Component({
  templateUrl: './guest-login.component.html',
  styleUrls: ['./guest-login.component.scss']
})
export class GuestLoginComponent implements OnInit {

  returnUrl = '';
  constructor(
    public sharedService: SharedService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  playAsGuest(){
    this.sharedService.playzoneUser.isGuest = 1;
    this.router.navigate([this.returnUrl]);
  }

  login(){
    this.router.navigate(['/login'], { queryParams: { returnUrl: this.returnUrl}});
  }

}
