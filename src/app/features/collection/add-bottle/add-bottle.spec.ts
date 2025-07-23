import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBottle } from './add-bottle';

describe('AddBottle', () => {
  let component: AddBottle;
  let fixture: ComponentFixture<AddBottle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBottle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBottle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
