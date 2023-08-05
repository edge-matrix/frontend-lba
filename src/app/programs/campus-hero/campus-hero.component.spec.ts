import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusHeroComponent } from './campus-hero.component';

describe('CampusHeroComponent', () => {
  let component: CampusHeroComponent;
  let fixture: ComponentFixture<CampusHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampusHeroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
