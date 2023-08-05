import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusHeroFromComponent } from './campus-form.component';

describe('CampusHeroFromComponent', () => {
  let component: CampusHeroFromComponent;
  let fixture: ComponentFixture<CampusHeroFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampusHeroFromComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusHeroFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
