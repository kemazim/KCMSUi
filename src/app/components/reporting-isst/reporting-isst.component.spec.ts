import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportingISSTComponent } from './reporting-isst.component';

describe('ReportingISSTComponent', () => {
  let component: ReportingISSTComponent;
  let fixture: ComponentFixture<ReportingISSTComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportingISSTComponent]
    });
    fixture = TestBed.createComponent(ReportingISSTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
