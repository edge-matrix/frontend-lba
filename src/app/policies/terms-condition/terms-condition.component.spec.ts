import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermConditionPageComponent } from './terms-condition.component';

describe('TermConditionPageComponent', () => {
  let component: TermConditionPageComponent;
  let fixture: ComponentFixture<TermConditionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermConditionPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermConditionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
