import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinGeckoComponent } from './coin-gecko.component';

describe('CoinGeckoComponent', () => {
  let component: CoinGeckoComponent;
  let fixture: ComponentFixture<CoinGeckoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoinGeckoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoinGeckoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
