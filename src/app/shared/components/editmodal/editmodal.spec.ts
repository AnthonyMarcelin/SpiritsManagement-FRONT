import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Editmodal } from './editmodal';

describe('Editmodal', () => {
  let component: Editmodal;
  let fixture: ComponentFixture<Editmodal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Editmodal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Editmodal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
