import { TestBed } from '@angular/core/testing';

import { Ex14Service } from './ex14-service';

describe('Ex14Service', () => {
  let service: Ex14Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ex14Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
