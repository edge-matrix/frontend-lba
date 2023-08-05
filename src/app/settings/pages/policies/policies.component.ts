import { Component, OnInit } from '@angular/core';
import { SharedService, StorageService } from '@service';

@Component({
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss']
})
export class PoliciesComponent implements OnInit {

  constructor(private sharedService: SharedService, private storageService: StorageService) { }

  ngOnInit(): void {
  }

}
