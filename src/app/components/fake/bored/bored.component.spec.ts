import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoredComponent } from './bored.component';

describe('BoredComponent', () => {
  let component: BoredComponent;
  let fixture: ComponentFixture<BoredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoredComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
