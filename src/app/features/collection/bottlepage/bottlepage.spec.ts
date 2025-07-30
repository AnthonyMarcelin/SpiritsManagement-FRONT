import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bottlepage } from './bottlepage';

describe('Bottlepage', () => {
  let component: Bottlepage;
  let fixture: ComponentFixture<Bottlepage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bottlepage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bottlepage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
