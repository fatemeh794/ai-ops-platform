import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureLoanDashboard } from './feature-loan-dashboard';

describe('FeatureLoanDashboard', () => {
  let component: FeatureLoanDashboard;
  let fixture: ComponentFixture<FeatureLoanDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureLoanDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureLoanDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
