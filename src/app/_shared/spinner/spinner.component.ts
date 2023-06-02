import { Component, OnInit } from '@angular/core';
import { SharedService } from '@service';

@Component({
  selector: 'app-loader',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class PageSpinnerComponent implements OnInit {

  loading = false;
  constructor(private sharedService: SharedService) {
    this.sharedService.isLoading.subscribe((v: boolean) => {
      this.loading = v;
    });
  }

  ngOnInit() {
  }

}
