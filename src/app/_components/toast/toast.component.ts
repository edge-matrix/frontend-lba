import { Component, Input, OnInit } from '@angular/core';
import { ToastService } from '@service';

@Component({
  selector: 'toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  constructor(public toastService: ToastService) {
    console.log(toastService.toastVar);
  }

  ngOnInit(): void {
  }
}
