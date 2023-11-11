import { Injectable, inject } from '@angular/core';
import { dateToNumber, getDate } from '@shared/utilities/helpers.functions';
import { LocalDbService } from '../external/local-db.service';
import { DBKeysEnum } from '@shared/enums/db-keys.enum';
import { Subject } from 'rxjs';
import { IActivityItem } from '@shared/models';

@Injectable({
  providedIn: 'root'
})
export class InternalClockService {
  private _updateActivitiesSubject = new Subject<void>();

  public get onUpdateActivity(): Subject<void> {
    return this._updateActivitiesSubject;
  }

  private localDBService = inject(LocalDbService);

  public initialize(): void {
    this.checkDate();
    const ONE_MINUTE = 60000;
    setInterval(() => this.checkDate(), ONE_MINUTE);
  }

  public updateActivitiesState(activities: IActivityItem[]) {
    console.log('[CLOCK] Updating Activities State');
    return activities.map((activity) => {
      const habit = { ...activity };
      if (habit.status === 'pending') {
        habit.streak = 0;
      }
      habit.status = 'pending';
      return habit;
    });
  }
  private checkDate() {
    if (this.isSameDay()) return;
    const currentDay = getDate();
    this.localDBService.saveData(DBKeysEnum.SAVED_DAY, dateToNumber(currentDay));
    this._updateActivitiesSubject.next();
  }

  private isSameDay(): boolean {
    const currentDay = getDate();
    const savedDay = this.localDBService.SavedDay;
    const check = dateToNumber(currentDay) === savedDay;
    console.log('[CLOCK] Is same day?', check);
    return check;
  }
}
