import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemCategories, Response } from '@models';
import { ComboDetailsService, SharedService, StorageService } from '@service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'home-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

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
          this.categories = this.categories.splice(0,10);
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
    this.sharedService.myBunkDetails.category = id;
    this.router.navigate(['/shops']);
  }
}
