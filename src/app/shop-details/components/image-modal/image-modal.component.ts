import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShopPhotos } from '@models';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'shop-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss']
})
export class ImageModalComponent implements OnInit {

  @Input()shopPhotos!: Array<ShopPhotos>;
  @Input()currentImage!: string;
  @Output() newItemEvent = new EventEmitter<string>();
  storageLink = environment.storage;
  counter = 0;
  constructor(
  ) {
  }

  ngOnInit(): void {
    $('#openModalButton').click();
    this.shopPhotos.forEach((e, i) => {
      if(this.currentImage === e.image){
        this.counter = i;
      }
    });
  }

  prev(){
    if(this.counter > 0){
      this.counter = this.counter - 1;
    }else{
      this.counter = this.shopPhotos.length - 1;
    }
    this.currentImage = this.shopPhotos[this.counter].image;
  }

  next(){
    if(this.counter < this.shopPhotos.length - 1){
      this.counter = this.counter + 1;
    }else{
      this.counter = 0;
    }
    this.currentImage = this.shopPhotos[this.counter].image;
  }
}
