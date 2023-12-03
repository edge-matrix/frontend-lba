import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShortLink, Response } from '@models';
import { PagesService } from '@service';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss','../spinner/spinner.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  page = 1;
  storageUrl = environment.storage;

  link = '';
  shortLink!: ShortLink;
  loading = false;
  isShortLink = true;
  type = 0 // 0 => Short Url, 1 => QR
  constructor(
    private pageService: PagesService,
    private router: Router,
  ) {
    this.link = this.router.url.replace('/','');
    if(this.link.split('/').length > 1){
      this.type = 1;
      this.link = this.link.split('/')[1];
    }else{
      this.type = 0;
    }
  }

  ngOnInit(): void {
    this.linkDetails();
  }

  linkDetails(){
    this.loading = true;
    this.pageService.getShortLink(this.link, this.type).subscribe((response: Response) => {
      if (response.statusCode != 200 && response.statusCode != 201) {
        console.log('Page Not Found!');
        this.isShortLink = false;
        this.loading = false;
      } else {
        if(response.singleData){
          const appLink = environment.appUrl;
          this.shortLink = response.singleData;
          if (this.shortLink.link.indexOf(appLink) >= 0){
            this.router.navigateByUrl(this.shortLink.link.replace(appLink,''));
          }else{
            window.open(this.shortLink.link,'_self');
          }
          this.isShortLink = true;
          this.loading = false;
        }
      }
    },
    error => {
      this.loading = false;
      this.isShortLink = false;
    });
  }



}
