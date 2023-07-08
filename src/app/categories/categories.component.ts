import { Component, OnInit } from '@angular/core';
import { BunkDetails, ItemCategories, Response } from '@models';
import { ComboDetailsService, SharedService, StorageService } from '@service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories!: Array<{data: ItemCategories, isActive: boolean}>;
  storageUrl = environment.storage;
  bunkDetails!: BunkDetails;
  constructor(
    private comboDetailService: ComboDetailsService,
    private sharedService: SharedService,
    private storageService: StorageService,
    private toastr: ToastrService,
  ) { }
  ngOnInit(): void {
    this.categoriesList();
    this.sharedService.sideMenuSelectedIndex = 1;
    this.sharedService.getMyBunkDetails().subscribe((value) => {
      this.bunkDetails = value;
    });
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
    this.bunkDetails.category = id;
    this.storageService.updatemyBunkDetails(this.bunkDetails);
  }
}
