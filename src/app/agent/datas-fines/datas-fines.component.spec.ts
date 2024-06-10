import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasFinesComponent } from './datas-fines.component';

describe('DatasFinesComponent', () => {
  let component: DatasFinesComponent;
  let fixture: ComponentFixture<DatasFinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatasFinesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatasFinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
