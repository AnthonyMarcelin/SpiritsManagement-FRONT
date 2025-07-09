import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhiskyList } from './whisky-list';

describe('WhiskyList', () => {
  let component: WhiskyList;
  let fixture: ComponentFixture<WhiskyList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhiskyList],
    }).compileComponents();

    fixture = TestBed.createComponent(WhiskyList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
