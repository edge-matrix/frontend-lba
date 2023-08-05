import { Component, OnInit } from '@angular/core';
import { SharedService, StorageService } from '@service';

@Component({
  templateUrl: './terms-condition.component.html',
  styleUrls: ['./terms-condition.component.scss']
})
export class TermConditionPageComponent implements OnInit {

  constructor(private sharedService: SharedService, private storageService: StorageService) { }

  ngOnInit(): void {
  }

}
