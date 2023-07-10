import { Component, Input, OnInit } from '@angular/core';
import { ShopPhotos } from '@models';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'shop-photos',
  templateUrl: './shop-photos.component.html',
  styleUrls: ['./shop-photos.component.scss']
})
export class ShopPhotosComponent implements OnInit {

  @Input() photos: Array<ShopPhotos> = [];
  showModal = false;
  currentImage = '';
  storageLink = environment.storage;
  constructor() { }

  ngOnInit(): void {
  }

  shopImageModal(src: string){
    this.showModal = true;
    this.currentImage = src;
  }

  closeModal(ev: any){
    this.showModal = false;
    this.currentImage = '';
  }

}
