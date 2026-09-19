import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { FeatureLoanForm } from './feature-loan-form';

describe('FeatureLoanForm', () => {
  let component: FeatureLoanForm;
  let fixture: ComponentFixture<FeatureLoanForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureLoanForm],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureLoanForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('starts with an empty collateral list and an invalid form', () => {
    expect(component['model']().collaterals.length).toBe(0);
    expect(component['loanForm']().invalid()).toBe(true);
  });

  it('addCollateral() appends a blank collateral row', () => {
    component['addCollateral']();
    expect(component['model']().collaterals.length).toBe(1);
    expect(component['model']().collaterals[0]).toEqual({ asset_type: '', estimated_value: 0 });
  });
});
