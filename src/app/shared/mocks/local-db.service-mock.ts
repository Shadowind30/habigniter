import { Injectable } from '@angular/core';
import { DBKeysEnum } from '@shared/enums/db-keys.enum';
import { LocalDBService } from '@shared/providers/external/local-db.service';

@Injectable()
export class LocalDBServiceMock extends LocalDBService {
  constructor() {
    super(null, console);
  }

  public override async init(): Promise<void> {
    return Promise.resolve();
  }

  public override async saveData(tokenKey: DBKeysEnum, data: any): Promise<void> {
    return Promise.resolve();
  }
}
