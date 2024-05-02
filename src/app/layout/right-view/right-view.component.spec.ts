import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightViewComponent } from './right-view.component';

describe('RightViewComponent', () => {
  let component: RightViewComponent;
  let fixture: ComponentFixture<RightViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RightViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RightViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
