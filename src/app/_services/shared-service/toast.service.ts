import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toastVar: { show: boolean, type: number, msg: string} = {
    show: false,
    type: 0,
    msg: ''
  };

  show(type: number, msg: string){
    this.toastVar = {
      show: true,
      type: type,
      msg: msg
    };
    setTimeout(() => {
      this.hide();
    }, 2000);
  }

  hide(){
    this.toastVar = {
      show: false,
      type: 0,
      msg: ''
    };
  }
}
