import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SwUpdate } from '@angular/service-worker';
import { NotificationService, SharedService, WebSocketService } from '@service';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit{
  constructor(
    private meta: Meta,
    private title: Title,
    private swUpdate: SwUpdate,
    private notificationService: NotificationService,
    private pusherNotificationService: WebSocketService,
    private sharedService: SharedService){
    this.meta.addTags([
      {name: 'description', content: 'Lets bunk again is a bunk planner help which help students/office works to plan and execute thier bunk in budget freindly and perfect hangout place.'},
      {name: 'robots', content: 'index, follow'},
      {name: 'keywords', content: 'bunk planner, bunking app'},
      {name: 'application-name', content: 'Lets Bunk Again'},
      {name: 'Generator', content: 'html 5,CSS,JavaScript,Typescript,Angualar,Laravel 8'},
      {name: 'language', content: 'English'},
    ]);
    this.title.setTitle('Lets Bunk Again - Your Bunking App');
  }

  ngOnInit() {
    this.notificationService.listen();
    this.serviceWorkerUpdate();
    window.addEventListener('beforeinstallprompt', event => {
      event.preventDefault();
      this.sharedService.promptEvent = event;
    });
    if(this.sharedService.user && this.sharedService.user.id !== 0 ){
      this.pusherNotificationService.listenChannel(['user-' + this.sharedService.user.id]);
    }
  }

  serviceWorkerUpdate(){
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
          window.location.reload();
        });
    }
  }
}
