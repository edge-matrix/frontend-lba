import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, SharedService, StorageService } from '@service';
import { environment } from 'src/environments/environment';


@Component({
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  storageLink = environment.storage;
  constructor(
    public sharedService: SharedService,
    private authenticationService: AuthenticationService,
    private storageService: StorageService,
    private router: Router
    ) {
    this.sharedService.sideMenuSelectedIndex = 4;
  }

  ngOnInit(): void {
  }

  logout(){
    this.authenticationService.logout().subscribe(() => {
      this.storageService.removeStorage();
      this.sharedService.user = {
        id: 0,
        name: '',
        username: '',
        user_role_id: 2,
        status: 0,
    };
      this.router.navigate(['../login']);
    },
    error => {
      console.log('Unable to Logout');
    });
  }

}
