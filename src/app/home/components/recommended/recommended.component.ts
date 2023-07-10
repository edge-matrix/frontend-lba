import { Component, OnInit } from '@angular/core';
import { Items, Paginate, Response } from '@models';
import { ComboDetailsService, SharedService } from '@service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'home-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.scss']
})
export class RecommendedComponent implements OnInit {

  itemLists: Array<{item: Items, isSelected: boolean}> = [];

  storageUrl = environment.storage;
  constructor(
    private comboDetailService: ComboDetailsService,
    private sharedService: SharedService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getItemList();
  }

  getItemList(){
    this.comboDetailService.getRecommended().subscribe((response: Response) => {
      if (response.statusCode != 200 && response.statusCode != 201) {
        this.toastr.error(this.sharedService.errorMessage(response.Error));
      } else {
        if(response.data){
          response.data.forEach(e => {
            this.itemLists.push({item: e, isSelected: false});
          });
        }
      }

    },
    error => {
      this.toastr.error('Something Went Wrong');

    });
  }

  addInCart(id: number){
    this.itemLists.forEach(e => {
      if(e.item.id === id){
        e.isSelected = true;
      }
    });
  }
}
