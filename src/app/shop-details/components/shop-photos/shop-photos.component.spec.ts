import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopPhotosComponent } from './shop-photos.component';

describe('ShopPhotosComponent', () => {
  let component: ShopPhotosComponent;
  let fixture: ComponentFixture<ShopPhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopPhotosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
