import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsFinesComponent } from './details-fines.component';

describe('DetailsFinesComponent', () => {
  let component: DetailsFinesComponent;
  let fixture: ComponentFixture<DetailsFinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsFinesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsFinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
