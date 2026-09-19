import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataAccessLoan } from './data-access-loan';

describe('DataAccessLoan', () => {
  let component: DataAccessLoan;
  let fixture: ComponentFixture<DataAccessLoan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataAccessLoan],
    }).compileComponents();

    fixture = TestBed.createComponent(DataAccessLoan);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
