import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Storage } from '@ionic/storage-angular';

import { LocalDBService } from './local-db.service';
import { DBKeysEnum } from '@shared/enums/db-keys.enum';
import { ConsoleService } from '../utilities/console.service';

fdescribe('LocalDBService', () => {
  let service: LocalDBService;
  let storage: Storage;
  let consoleService: ConsoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [LocalDBService, Storage, ConsoleService] });
    service = TestBed.inject(LocalDBService);
    storage = TestBed.inject(Storage);
    consoleService = TestBed.inject(ConsoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Tests for init', () => {
    it('should call the methods', fakeAsync(() => {
      const createSpy = spyOn(storage, 'create').and.returnValue(Promise.resolve({} as Storage));
      const initFromDBSpy = spyOn(service, 'initFromDB' as any).and.returnValue(Promise.resolve());

      service.init();
      tick();

      expect(createSpy).toHaveBeenCalled();
      expect(initFromDBSpy).toHaveBeenCalled();
    }));

    it('should not call initFromDB if Storage.create fails', fakeAsync(() => {
      const createSpy = spyOn(storage, 'create').and.returnValue(Promise.reject('Storage creation failed'));
      const initFromDBSpy = spyOn(service, 'initFromDB' as any).and.returnValue(Promise.resolve());

      service.init();
      tick();

      expect(createSpy).toHaveBeenCalled();
      expect(initFromDBSpy).not.toHaveBeenCalled();
    }));
  });
  describe('Tests for saveData', () => {
    it('should call Storage.remove if the data is null', fakeAsync(() => {
      const removeSpy = spyOn(storage, 'remove').and.returnValue(Promise.resolve());
      service.init();
      tick();
      service['saveData'](DBKeysEnum.ACTIVITIES, null);

      expect(removeSpy).toHaveBeenCalled();
    }));

    it('should call Storage.set if the data is not null', fakeAsync(() => {
      const setSpy = spyOn(storage, 'set').and.returnValue(Promise.resolve());
      service.init();
      tick();
      service['saveData'](DBKeysEnum.SAVED_DAY, 20231207);

      expect(setSpy).toHaveBeenCalled();
    }));

    fit('should show error message if invalid key was provided', async () => {
    const errorSpy = spyOn(consoleService, 'error');

      await service.init();
      service.saveData('invalidKey' as unknown as DBKeysEnum, 20231207);

      expect(errorSpy).toHaveBeenCalled();
    });
  });
});
