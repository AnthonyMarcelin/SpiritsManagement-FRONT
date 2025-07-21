import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlcoholCard } from './alcohol-card';

describe('AlcoholCard', () => {
  let component: AlcoholCard;
  let fixture: ComponentFixture<AlcoholCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlcoholCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlcoholCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
