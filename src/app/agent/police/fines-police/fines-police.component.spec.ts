import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinesPoliceComponent } from './fines-police.component';

describe('FinesPoliceComponent', () => {
  let component: FinesPoliceComponent;
  let fixture: ComponentFixture<FinesPoliceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinesPoliceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinesPoliceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
