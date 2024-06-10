import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFineComponent } from './update-fine.component';

describe('UpdateFineComponent', () => {
  let component: UpdateFineComponent;
  let fixture: ComponentFixture<UpdateFineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateFineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateFineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
