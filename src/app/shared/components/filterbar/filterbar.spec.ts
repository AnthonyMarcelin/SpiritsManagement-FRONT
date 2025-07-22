import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Filterbar } from './filterbar';

describe('Filterbar', () => {
  let component: Filterbar;
  let fixture: ComponentFixture<Filterbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Filterbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Filterbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
