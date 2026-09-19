import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureLoanForm } from './feature-loan-form';

describe('FeatureLoanForm', () => {
  let component: FeatureLoanForm;
  let fixture: ComponentFixture<FeatureLoanForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureLoanForm],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureLoanForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
