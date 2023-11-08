import { TestBed } from '@angular/core/testing';

import { InternalClockService } from './internal-clock.service';

describe('InternalClockService', () => {
  let service: InternalClockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InternalClockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
