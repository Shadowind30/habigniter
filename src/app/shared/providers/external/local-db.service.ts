import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { DBKeysEnum } from '@shared/enums/db-keys.enum';
import { IActivityItem } from '@shared/models';

type Values = IActivityItem[] | number;

@Injectable({
  providedIn: 'root'
})
export class LocalDbService {
  private activities: IActivityItem[] = [];
  private savedDay: number;

  public get Activities(): IActivityItem[] {
    return this.activities;
  }

  public get SavedDay(): number {
    return this.savedDay;
  }

  public async loadData() {
    const self: any = this;
    const res = await Preferences.keys();
    const keys: DBKeysEnum[] = res.keys as DBKeysEnum[];
    keys.forEach(async (key) => {
      const res = await Preferences.get({ key });
      const value: Values = JSON.parse(res.value);
      self[key] = value;
      console.log('[LocalDB] loading ', key, value);
    });
  }

  public async saveData(key: DBKeysEnum, value: Values) {
    const self: any = this;
    self[key] = value;
    Preferences.set({
      key,
      value: JSON.stringify(value)
    });
  }
}
