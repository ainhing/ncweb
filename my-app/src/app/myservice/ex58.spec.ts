import { TestBed } from '@angular/core/testing';

import { Ex58 } from './ex58';

describe('Ex58', () => {
  let service: Ex58;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ex58);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
