import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComboDetailsService, SharedService, StorageService } from '@service';
import { Response } from '@models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  searchHistory: Array<{title: string, url: string, type: number}> = [];
  searchSuggestion: Array<{title: string, url: string, type: number}> = [];
  suggestionStatus = 0;
  searchKeyword = "";
  showNoItem = 0
  constructor(public sharedService: SharedService, private storageService: StorageService, private router: Router, private comboService: ComboDetailsService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.searchHistory = this.sharedService.mySearchHistory;
  }

  showSuggestion(){
    this.suggestionStatus = 1;
  }

  search(){
    if(this.searchKeyword !== ''){
      this.suggestionStatus = 1;
      this.comboService.search(this.searchKeyword).subscribe((response: Response) => {
        if (response.statusCode != 200 && response.statusCode != 201) {
          this.toastr.error(this.sharedService.errorMessage(response.Error));
          this.router.navigate(['/']);
        } else {
          if(response.data){
            this.searchSuggestion = response.data;
            if(this.searchSuggestion.length > 0){
              this.suggestionStatus = 2;
              this.showNoItem = 0;
            }else{
              this.showNoItem = 1;
            }
          }
        }
      },
      error => {
        this.toastr.error('Something Went Wrong');
      });
    }else{
      this.suggestionStatus = 0;
      this.searchSuggestion = [];
      this.showNoItem = 0;
    }
  }

  jumpToSuggest(index: number, type: number){
    if(type === 0){
      this.searchHistory.splice(index, 1);
      this.searchHistory.push(this.searchHistory[index]);
      this.storageService.updatemySearchHistory(this.searchHistory);
      this.router.navigate([this.searchHistory[index].url]);
    }else{
      this.searchHistory.push(this.searchSuggestion[index]);
      this.storageService.updatemySearchHistory(this.searchHistory);
      this.router.navigate([this.searchSuggestion[index].url]);
    }
  }

  removeSuggestion(i:number){
    this.searchHistory.splice(i, 1);
    this.storageService.updatemySearchHistory(this.searchHistory);
  }

}
