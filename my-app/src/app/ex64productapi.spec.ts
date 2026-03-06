import { TestBed } from '@angular/core/testing';

import { Ex64productapi } from './ex64productapi';

describe('Ex64productapi', () => {
  let service: Ex64productapi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ex64productapi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
