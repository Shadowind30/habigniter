import { Injectable } from '@angular/core';
import { IActivityItem } from '@models';
import { LocalDBService } from '@shared/providers/external/local-db.service';

@Injectable()
export class LocalDBServiceMock extends LocalDBService{

    constructor() {
        super(null); // Pass null to the original constructor or provide a mock Storage
      }
      
  // Override methods for testing
  public override async init(): Promise<void> {
    return Promise.resolve();
  }

  public override async saveData(tokenKey: string, data: any): Promise<void> {
    return Promise.resolve();
  }

}
