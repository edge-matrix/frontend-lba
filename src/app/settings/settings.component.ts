import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, NotificationService, SharedService, StorageService } from '@service';
import { environment } from 'src/environments/environment';


@Component({
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  storageLink = environment.storage;
  isDisable = false;
  constructor(
    public sharedService: SharedService,
    private authenticationService: AuthenticationService,
    private storageService: StorageService,
    private notificationService: NotificationService,
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
        isNameReal: 0,
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

  download(){
    this.sharedService.promptEvent.prompt();
  }

  enableNotification(){
    this.notificationService.subscribeToNotifications();
  }

}
