import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Deletemodal } from './deletemodal';

describe('Deletemodal', () => {
  let component: Deletemodal;
  let fixture: ComponentFixture<Deletemodal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Deletemodal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Deletemodal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
