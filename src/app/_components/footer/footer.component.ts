import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from '@service';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Input() show = true;
  constructor(public sharedService: SharedService) { }

  ngOnInit(): void {
  }

}
