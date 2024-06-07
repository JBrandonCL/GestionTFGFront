import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostfineComponent } from './postfine.component';

describe('PostfineComponent', () => {
  let component: PostfineComponent;
  let fixture: ComponentFixture<PostfineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostfineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostfineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
