import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavShopComponent } from './fav-shop.component';

describe('FavShopComponent', () => {
  let component: FavShopComponent;
  let fixture: ComponentFixture<FavShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavShopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
