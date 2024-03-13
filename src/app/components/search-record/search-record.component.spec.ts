import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRecordComponent } from './search-record.component';

describe('SearchRecordComponent', () => {
  let component: SearchRecordComponent;
  let fixture: ComponentFixture<SearchRecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchRecordComponent]
    });
    fixture = TestBed.createComponent(SearchRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
