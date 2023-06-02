import { Injectable } from '@angular/core';
import { SharedService } from '@service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(public sharedService: SharedService) {
  }

  updateUser(data: any){
    localStorage.setItem('currentUser', JSON.stringify(data));
    this.sharedService.user = JSON.parse(localStorage.getItem('currentUser') || 'null');
  }

  updatePageRecords(data: {id: number, page: number}){
    let isPresent = this.sharedService.pages.filter(e => e.id === data.id).length > 0;
    if(isPresent){
      this.sharedService.pages.filter(e => e.id === data.id)[0].page = data.page;
    }else{
      this.sharedService.pages.push(data);
    }
    localStorage.setItem('pageRecords', JSON.stringify(this.sharedService.pages));
    this.sharedService.pages = JSON.parse(localStorage.getItem('pageRecords') || 'null')||[];
  }

  removeStorage(){
    localStorage.removeItem("currentUser");
    localStorage.removeItem("pageRecords");
  }
}
