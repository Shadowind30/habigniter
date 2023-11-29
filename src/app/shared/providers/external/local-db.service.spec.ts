import { TestBed } from '@angular/core/testing';
import {Storage} from '@ionic/storage-angular';

import { LocalDbService } from './local-db.service';

describe('LocalDbService', () => {
  let service: LocalDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [Storage]});
    service = TestBed.inject(LocalDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
