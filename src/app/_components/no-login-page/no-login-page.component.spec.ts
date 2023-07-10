import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoLoginPageComponent } from './no-login-page.component';

describe('NoLoginPageComponent', () => {
  let component: NoLoginPageComponent;
  let fixture: ComponentFixture<NoLoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoLoginPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoLoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
