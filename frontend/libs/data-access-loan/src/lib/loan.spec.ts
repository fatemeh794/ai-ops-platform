import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

import { LoanService } from './loan';
import { ApplicantOut, LoanApplicationOut } from './models';

describe('LoanService', () => {
  let service: LoanService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(LoanService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('createApplicant() should POST to /api/applicants/', () => {
    const payload = {
      full_name: 'Reza Test',
      national_id: '0012345678',
      monthly_income: 25000000,
    };
    const mockResponse: ApplicantOut = { id: 1, ...payload };

    service.createApplicant(payload).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8000/api/applicants/');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);
    req.flush(mockResponse);
  });

  it('createLoanApplication() should POST to /api/loan-applications/', () => {
    const payload = {
      applicant_id: 1,
      requested_amount: 100000000,
      repayment_months: 12,
      collaterals: [],
    };
    const mockResponse: LoanApplicationOut = { id: 5, status: 'pending', ...payload };

    service.createLoanApplication(payload).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8000/api/loan-applications/');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('submitForAssessment() should POST to the submit-for-assessment endpoint', () => {
    service.submitForAssessment(5).subscribe((res) => {
      expect(res).toEqual({ status: 'assessing' });
    });

    const req = httpMock.expectOne(
      'http://localhost:8000/api/loan-applications/5/submit-for-assessment',
    );
    expect(req.request.method).toBe('POST');
    req.flush({ status: 'assessing' });
  });
});
