import { Component, OnInit } from '@angular/core';
import { AuthenticationService, SharedService, StorageService } from '@service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Paginate, User, Response, Notification } from '@models';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  storageUrl = environment.storage;
  notifications!: Array<Notification>;
  user: User;
  isShowNotification = false;
  isShowProfile = false;
  header = [
    {icon:'fa-comment',number:2,status:false},
    {icon:'fa-envelope',number:1,status:false},
    {icon:'fa-bell',number:0,status:false},
    {icon:'fa-user',number:0,status:false},
  ]
  constructor(private authenticationService: AuthenticationService,
    private router: Router,
    public sharedService: SharedService,
    private storageService: StorageService) {
      this.user = this.sharedService.user;
   }

  ngOnInit(): void {
  }

  openHeader(i:number){
    this.header.forEach((e, index) => {
      if(index === i){
        this.header[i].status = this.header[i].status?false:true;
      }else{
        this.header[index].status = false;
      }
    });
  }

  logout(){
    this.authenticationService.logout().subscribe(() => {
      this.storageService.removeStorage();
      this.sharedService.user = {
        id: 0,
        name: '',
        username: '',
        user_role_id: 0,
        status: 0
    };
      this.router.navigate(['../login']);
    },
    error => {
      console.log('Unable to Logout');
    });
  }
}
