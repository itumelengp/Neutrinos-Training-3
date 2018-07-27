import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HerodetailsComponent } from './herodetails.component';

describe('HerodetailsComponent', () => {
  let component: HerodetailsComponent;
  let fixture: ComponentFixture<HerodetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HerodetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HerodetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
