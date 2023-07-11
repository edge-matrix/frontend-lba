import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ItemCategories, Response, Shop } from '@models';
import { ComboDetailsService, SharedService } from '@service';
import { ToastrService } from 'ngx-toastr';
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
  @Output() newItemEvent = new EventEmitter<number>();
  categories!: Array<{data: ItemCategories, isActive: boolean}>;
  storageUrl = environment.storage;
  constructor(
    private comboDetailService: ComboDetailsService,
    private sharedService: SharedService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.categoriesList();
    this.sharedService.sideMenuSelectedIndex = 0;
  }

  categoriesList(){
    this.comboDetailService.getItemCategories().subscribe((response: Response) => {
      if (response.statusCode != 200 && response.statusCode != 201) {
        this.toastr.error(this.sharedService.errorMessage(response.Error));
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
      this.toastr.error('Something Went Wrong');
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
    this.newItemEvent.emit(id);
  }

  openSearch(){
    this.router.navigate(['/search']);
  }

}
