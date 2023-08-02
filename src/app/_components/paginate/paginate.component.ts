import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Link } from '@models';
import { ToastService } from '@service';

@Component({
  selector: 'paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.scss']
})
export class PaginateComponent implements OnInit {

  @Input() links: Array<Link> = [];
  @Input() page: number = 0;
  @Input() lastPage: number = 0;
  @Output() paginate = new EventEmitter<number>();
  constructor() {
  }

  ngOnInit(): void {
  }

  jumpToPage(page: string){
    this.paginate.emit(parseInt(page));
  }
}
