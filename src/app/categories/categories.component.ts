import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemCategories, Response } from '@models';
import { ComboDetailsService, SharedService } from '@service';
import { environment } from 'src/environments/environment';

@Component({
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
  ) { }
  ngOnInit(): void {
    this.categoriesList();
    this.sharedService.sideMenuSelectedIndex = 1;
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
    this.router.navigate(['/shops']);
  }
}
