import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { DBKeysEnum } from '@shared/enums/db-keys.enum';
import { IActivityItem } from '@shared/models';

type Values = IActivityItem[];

@Injectable({
  providedIn: 'root',
})
export class LocalDbService {
  private activities: IActivityItem[] = [];

  public get Activities(): IActivityItem[] {
    return this.activities;
  }

  public async loadData() {
    const res = await Preferences.keys();
    const keys: DBKeysEnum[] = res.keys as DBKeysEnum[];
    keys.forEach(async (key) => {
      const res = await Preferences.get({ key });
      const value: Values = JSON.parse(res.value);
      this[key] = value;
    });
  }

  public async saveData(key: DBKeysEnum, value: Values) {
    this[key] = value;
    Preferences.set({
      key,
      value: JSON.stringify(value),
    });
  }
}