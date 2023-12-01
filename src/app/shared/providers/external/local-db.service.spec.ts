import { TestBed } from '@angular/core/testing';
import {Storage} from '@ionic/storage-angular';

import { LocalDBService } from './local-db.service';

describe('LocalDBService', () => {
  let service: LocalDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [Storage]});
    service = TestBed.inject(LocalDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
