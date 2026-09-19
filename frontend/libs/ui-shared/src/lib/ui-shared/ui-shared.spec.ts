import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiShared } from './ui-shared';

describe('UiShared', () => {
  let component: UiShared;
  let fixture: ComponentFixture<UiShared>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiShared],
    }).compileComponents();

    fixture = TestBed.createComponent(UiShared);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
