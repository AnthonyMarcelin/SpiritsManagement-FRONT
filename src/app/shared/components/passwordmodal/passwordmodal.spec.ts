import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Passwordmodal } from './passwordmodal';

describe('Passwordmodal', () => {
  let component: Passwordmodal;
  let fixture: ComponentFixture<Passwordmodal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Passwordmodal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Passwordmodal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
