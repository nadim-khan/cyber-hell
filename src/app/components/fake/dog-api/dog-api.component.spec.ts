import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogApiComponent } from './dog-api.component';

describe('DogApiComponent', () => {
  let component: DogApiComponent;
  let fixture: ComponentFixture<DogApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DogApiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DogApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
