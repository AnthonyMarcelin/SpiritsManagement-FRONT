import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Optionbar } from './optionbar';

describe('Optionbar', () => {
  let component: Optionbar;
  let fixture: ComponentFixture<Optionbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Optionbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Optionbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
