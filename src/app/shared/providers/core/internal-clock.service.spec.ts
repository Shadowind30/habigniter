import { TestBed } from '@angular/core/testing';

import { InternalClockService } from './internal-clock.service';
import { LocalDBService } from '../external/local-db.service';
import { LocalDBServiceMock } from '@shared/mocks';

describe('InternalClockService', () => {
  let service: InternalClockService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{provide: LocalDBService, useValue: LocalDBServiceMock}]
    });
    service = TestBed.inject(InternalClockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
