import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Sortbar } from './sortbar';

describe('Sortbar', () => {
  let component: Sortbar;
  let fixture: ComponentFixture<Sortbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [Sortbar],
    }).compileComponents();

    fixture = TestBed.createComponent(Sortbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
