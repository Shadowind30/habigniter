import { Injectable, inject } from '@angular/core';
import { dateToNumber, getDate, getDaysBetweenDates } from '@shared/utilities/helpers.functions';
import { LocalDBService } from '../external/local-db.service';
import { DBKeysEnum } from '@shared/enums/db-keys.enum';
import { Subject } from 'rxjs';
import { IActivityItem } from '@shared/models';

@Injectable({
  providedIn: 'root'
})
export class InternalClockService {
  private _updateActivitiesSubject = new Subject<number>();

  public get onUpdateActivity(): Subject<number> {
    return this._updateActivitiesSubject;
  }

  private localDBService = inject(LocalDBService);

  public initialize(): void {
    this.checkDate();
    const ONE_MINUTE = 60000;
    setInterval(() => this.checkDate(), ONE_MINUTE);
  }

  public updateActivitiesState(activities: IActivityItem[]): IActivityItem[] {
    console.log('[CLOCK] Updating Activities State');
     activities = activities.map((activity) => {
      const habit = { ...activity };
      if (habit.status === 'pending') {
        habit.streak = 0;
      }
      if('tasks' in habit) {
        habit.tasks = habit.tasks.map((task) => {
          task.completed = false;
          return task;
        });
      }
      habit.status = 'pending';
      return habit;
    });
    this.localDBService.saveData(DBKeysEnum.ACTIVITIES, activities);
    return activities;
  }
  private checkDate() {
    const daysSince = this.daysSince();
    if (daysSince === 0) return;
    const currentDay = getDate();
    this.localDBService.saveData(DBKeysEnum.SAVED_DAY, dateToNumber(currentDay));
    this._updateActivitiesSubject.next(daysSince);
  }

  private daysSince(): number {
    const currentDay = getDate();
    const savedDay = this.localDBService.SavedDay;
    const days = getDaysBetweenDates(savedDay, dateToNumber(currentDay));
    console.log('[CLOCK] Days since last check?', days);
    return days;
  }
}
