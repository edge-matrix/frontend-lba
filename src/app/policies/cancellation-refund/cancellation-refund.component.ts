import { Component, OnInit } from '@angular/core';
import { SharedService, StorageService } from '@service';

@Component({
  templateUrl: './cancellation-refund.component.html',
  styleUrls: ['./cancellation-refund.component.scss']
})
export class CancellationRefundComponent implements OnInit {

  constructor(private sharedService: SharedService, private storageService: StorageService) { }

  ngOnInit(): void {
  }

}
