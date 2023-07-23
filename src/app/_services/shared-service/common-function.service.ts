import { Injectable } from '@angular/core';
import { FavService, SharedService, StorageService } from '@service';
import { Response } from '@models';

@Injectable({
  providedIn: 'root'
})
export class CommonFunctionService {

  constructor(private sharedService: SharedService,
    private storageService: StorageService,
    private favService: FavService,) {
  }

  addToFav(type: number, id: number){
    this.favService.addFav(type, id).subscribe((response: Response) => {
      if (response.statusCode != 200 && response.statusCode != 201) {
        this.sharedService.showMessage(1,this.sharedService.errorMessage(response.Error));
      } else {
        if(response.success){
          this.getFavs();
        }
      }
    },
    error => {
      this.sharedService.showMessage(1,'Something Went Wrong');
    });
  }

  deleteFav(type: number, id: number){
    this.favService.deleteFav(type, id).subscribe((response: Response) => {
      if (response.statusCode != 200 && response.statusCode != 201) {
        this.sharedService.showMessage(1,this.sharedService.errorMessage(response.Error));
      } else {
        if(response.success){
          this.getFavs();
        }
      }
    },
    error => {
      this.sharedService.showMessage(1,'Something Went Wrong');
    });
  }

  checkFav(type: number, id: number){
    let out = false;
    this.sharedService.userFav.forEach(e => {
      if(type === 0 && e.type === 0 && e.shop_id === id){
        out = true;
      }
      if(type === 1 && e.type === 1 && e.items_id === id){
        out = true;
      }
    });
    return out;
  }

  getFavs(){
    this.favService.getAll().subscribe((response: Response) => {
      if (response.statusCode != 200 && response.statusCode != 201) {
        this.sharedService.showMessage(1,this.sharedService.errorMessage(response.Error));
      } else {
        if(response.data){
          this.sharedService.userFav = response.data;
          this.storageService.updateFav(this.sharedService.userFav);
        }
      }
    },
    error => {
      this.sharedService.showMessage(1,'Something Went Wrong');
    });
  }
}
