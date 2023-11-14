import { Injectable } from '@angular/core';
import Pusher from "pusher-js";
import { environment } from 'src/environments/environment';
import { SharedService } from '@service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  // Pusher Variable
  pusher: any = "";
  constructor(private sharedService: SharedService) {
    if(this.sharedService.user && this.sharedService.user.id !== 0){
      this.pusher = new Pusher(environment.pusher, {
        cluster: "ap2",
        authEndpoint: environment.baseUrl.replace('/api','') + '/broadcasting/auth',
        auth: {
          headers: {
            "Authorization": "Bearer " + this.sharedService.user.token,
            "Access-Control-Allow-Origin": "*",
            transport: "jsonp",
          }
        }
      });
    }else{
      this.pusher = new Pusher(environment.pusher, {
        cluster: "ap2"
      });
    }
  }

  // Listen To Channels and Subscribe them
  listenChannel(names: any) {
    // Loop for channels Names
    for(let i = 0; i<names.length; i++) {
      // Subscribe channels
      const channel = this.pusher.subscribe("private-" + names[i]);

      this.pusher.connection.bind("connected", function() {
        console.log('Connection completed!');
      });
      channel.bind('pusher:subscription_succeeded', function() {
        console.log('successfully subscribed!');
      });
      channel.bind('ShopEvent', (message: any) => {
        this.sharedService.newNotification.next(message.data);
      });
    }

    this.pusher.allChannels().forEach((channel: { name: string; }) => {
      console.log("Subscribe: ", channel.name);
    });
  }


  // Unsubscribe channels
  unsubscribueChannel(names: any) {
    for (let i = 0; i < names.length; i++) {
      this.pusher.unsubscribe("private-" + names[i]);

      this.pusher.connection.bind("disconnected", function() {
        console.log('successfully unubscribed!');
      });
    }
    this.pusher.allChannels().forEach((channel: { name: string; }) => {
      console.log("Subscribe: ", channel.name);
    });
  }
}
