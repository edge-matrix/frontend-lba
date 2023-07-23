import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ItemCategories, Response, Shop } from '@models';
import { ComboDetailsService, SharedService } from '@service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'menu-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input() type = 0;
  @Input() catId!: number;
  @Input() shop!: Shop;
  @Output() newItemEvent = new EventEmitter<{catId: number, search: string}>();
  categories!: Array<{data: ItemCategories, isActive: boolean}>;
  storageUrl = environment.storage;
  searchKeyword = '';
  constructor(
    private comboDetailService: ComboDetailsService,
    private sharedService: SharedService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.categoriesList();
    this.sharedService.sideMenuSelectedIndex = 0;
  }

  categoriesList(){
    this.comboDetailService.getItemCategories().subscribe((response: Response) => {
      if (response.statusCode != 200 && response.statusCode != 201) {
        this.sharedService.showMessage(1,this.sharedService.errorMessage(response.Error));
      } else {
        if(response.data){
          this.categories = [];
          this.categories.push({data: {id: 0, name: 'All', slug: 'all', status: 1, image: ''}, isActive: true});
          response.data.forEach(cat => {
            this.categories.push({data: cat, isActive: false});
          });
        }
      }
    },
    error => {
      this.sharedService.showMessage(1,'Something Went Wrong');
    });
  }

  updateCategory(id: number){
    this.categories.forEach(cat => {
      if(cat.data.id === id){
        cat.isActive = true;
      }else{
        cat.isActive = false;
      }
    });
    this.newItemEvent.emit({catId: id, search: ''});
  }

  search(){
    if(this.searchKeyword === ''){
      this.newItemEvent.emit({catId: 0, search: ''});
    }else{
      this.newItemEvent.emit({catId: 0, search: this.searchKeyword});
    }
  }
}
