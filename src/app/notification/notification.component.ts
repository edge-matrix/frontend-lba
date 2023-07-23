import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Response, Notification, Paginate, Link } from '@models';
import { SharedService, NotifyService } from '@service';



@Component({
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  notifications!: Array<Notification>;
  links!: Link[];

  page = 1;
  constructor(public sharedService: SharedService,
    private notifyService: NotifyService,

    private router: Router) {
  }

  ngOnInit(): void {
    this.sharedService.sideMenuSelectedIndex = 4;
    this.getNotification();
  }

  getNotification(){

    this.notifyService.getAll(this.sharedService.user.id,this.page).subscribe((response: Response) => {
      if (response.statusCode != 200 && response.statusCode != 201) {
        this.sharedService.showMessage(1,this.sharedService.errorMessage(response.Error));
        this.router.navigate(['../..']);
      } else {
        if(response.paginate){
          let paginate: Paginate = response?.paginate;
          this.notifications = paginate.data;
          this.links = paginate.links;
          this.notifications.sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
        }
      }

    },
    error => {
      this.sharedService.showMessage(1,'Something Went Wrong');

    });
  }

  paginate(id: number){
    this.page = id;
    this.getNotification();
  }

  markAsRead(id:number){

    this.notifyService.markAsRead(id).subscribe((response: Response) => {
      if (response.statusCode != 200 && response.statusCode != 201) {
        this.sharedService.showMessage(1,this.sharedService.errorMessage(response.Error));
      } else {
        this.notifications.forEach(e=>{
          if(e.id === id){
            e.status = 1;
          }
        })
      }

    },
    error => {
      this.sharedService.showMessage(1,'Something Went Wrong');

      this.router.navigate(['../..']);
    });
  }

  markAsAllRead(){

    this.notifyService.markAsAllRead().subscribe((response: Response) => {
      if (response.statusCode != 200 && response.statusCode != 201) {
        this.sharedService.showMessage(1,this.sharedService.errorMessage(response.Error));
      } else {
        this.notifications.forEach(e=>{
            e.status = 1;
        })
      }

    },
    error => {
      this.sharedService.showMessage(1,'Something Went Wrong');

      this.router.navigate(['../..']);
    });
  }

}
