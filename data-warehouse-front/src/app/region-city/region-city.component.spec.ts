import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionCityComponent } from './region-city.component';

describe('RegionCityComponent', () => {
  let component: RegionCityComponent;
  let fixture: ComponentFixture<RegionCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegionCityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
