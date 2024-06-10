import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInfoUserComponent } from './search-info-user.component';

describe('SearchInfoUserComponent', () => {
  let component: SearchInfoUserComponent;
  let fixture: ComponentFixture<SearchInfoUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchInfoUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchInfoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
