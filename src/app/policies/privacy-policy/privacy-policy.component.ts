import { Component, OnInit } from '@angular/core';
import { SharedService, StorageService } from '@service';

@Component({
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {

  constructor(private sharedService: SharedService, private storageService: StorageService) { }

  ngOnInit(): void {
  }

}
