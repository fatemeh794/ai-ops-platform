import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { FeatureLoanDashboard } from './feature-loan-dashboard';

describe('FeatureLoanDashboard', () => {
  let component: FeatureLoanDashboard;
  let fixture: ComponentFixture<FeatureLoanDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureLoanDashboard],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureLoanDashboard);
    fixture.componentRef.setInput('id', '1');
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
