import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottleCard } from './bottle-card';

describe('BottleCard', () => {
  let component: BottleCard;
  let fixture: ComponentFixture<BottleCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottleCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BottleCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
