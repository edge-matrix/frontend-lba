import { Injectable } from '@angular/core';
import { BunkDetails, Location, User } from '@models';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  version = '23.07.08.01';
  usernameInfo = `
  Username Acceptance critria:
1. Only contains alphanumeric characters, underscore and dot.
2. Underscore and dot can't be at the end or start of a username (e.g _username / username_ / .username / username.).
3. Underscore and dot can't be next to each other (e.g user_.name).
4. Underscore or dot can't be used multiple times in a row (e.g user__name / user..name).
5. Number of characters must be between 8 to 20.
  `;
  user: User;
  sideMenuSelectedIndex = 0;
  subSideMenuSelectedIndex = 0;
  private myBunkDetails: BehaviorSubject<BunkDetails>;
  public isLoading = new BehaviorSubject(false);
  mySearchHistory: Array<string>;
  myLocation : Location;
  myLocationHistory: Array<Location>;
  couponByURL: string;

  constructor() {
    this.user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    this.myBunkDetails = new BehaviorSubject<BunkDetails>( JSON.parse(localStorage.getItem('myBunkDetails') || 'null'));
    this.mySearchHistory = JSON.parse(localStorage.getItem('mySearchHistory') || 'null')||[];
    this.myLocation = JSON.parse(localStorage.getItem('myLocation') || 'null')||[];
    this.myLocationHistory = JSON.parse(localStorage.getItem('myLocationHistory') || 'null')||[];

    this.couponByURL = localStorage.getItem('couponByURL') || 'null';

    //Reset Bunk Details
    if(this.myBunkDetails.value === null){
      let today = new Date().getFullYear() + '-' + String(new Date().getMonth() + 1).padStart(2, '0') + '-' + String(new Date().getDate()).padStart(2, '0');
      let startTime =  String(new Date().getHours()).padStart(2, '0') +':'+ String(new Date().getMinutes()).padStart(2, '0');
      let endTime =  String(new Date().getHours()).padStart(2, '0') +':'+ String(new Date().getMinutes()).padStart(2, '0');
      this.setMyBunkDetails({sizeOfGroup: 2, bunkDate: today, location: {lat: 26.8488279, lng:80.8724728, place:'Lucknow, Uttar Pradesh, India'},radius: 20, startTime: startTime, endTime: endTime, isTimeBound:0, note:'', medium: 'LBA'});
    }
  }

  getMyBunkDetails(): Observable<BunkDetails> {
    return this.myBunkDetails.asObservable();
  }
  setMyBunkDetails(newValue: BunkDetails): void {
    this.myBunkDetails.next(newValue);
  }

  errorMessage(error:string|undefined){
    return JSON.stringify(error).replace('{','').replace('}','').replace('[','').replace(']','');
  }
}
