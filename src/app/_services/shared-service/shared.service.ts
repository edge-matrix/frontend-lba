import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '@models';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  version = '23.06.07.01';
  user: User;
  sideMenuSelectedIndex = 0;
  pages: Array<{id: number, page: number}> = [];
  public isLoading = new BehaviorSubject(false);
  constructor() {
    this.user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    this.pages = JSON.parse(localStorage.getItem('pageRecords') || 'null')||[];
  }

  errorMessage(error:string|undefined){
    return JSON.stringify(error).replace('{','').replace('}','').replace('[','').replace(']','');
  }
}
