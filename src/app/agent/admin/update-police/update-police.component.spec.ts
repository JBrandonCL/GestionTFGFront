import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePoliceComponent } from './update-police.component';

describe('UpdatePoliceComponent', () => {
  let component: UpdatePoliceComponent;
  let fixture: ComponentFixture<UpdatePoliceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdatePoliceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatePoliceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
