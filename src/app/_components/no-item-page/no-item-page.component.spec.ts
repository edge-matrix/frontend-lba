import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoItemPageComponent } from './no-item-page.component';

describe('NoItemPageComponent', () => {
  let component: NoItemPageComponent;
  let fixture: ComponentFixture<NoItemPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoItemPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoItemPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
