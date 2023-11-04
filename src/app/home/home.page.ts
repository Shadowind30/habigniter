import { Component, ViewChild } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { IActivityItem } from '@shared/models';
import { AlertsService } from '@shared/providers/utilities/alerts.service';
import {
  getInitialDateISOString,
  getRandomID,
} from '@shared/utilities/helpers.functions';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class HomePage {
  @ViewChild('form') modal: HTMLIonModalElement;
  public modalHeight = 260 / window.innerHeight;
  public nameValue: string;
  public errorMessage = 'El nombre debe de contener al menos 3 caracteres';

  public activities: IActivityItem[] = [
    {
      title: 'Read 20 pages of a book',
      status: 'pending',
      createdAt: '2020-01-01T00:00:00.000Z',
      streak: 0,
      id: '1',
    },
  ];

  private activityBeingEdited: IActivityItem;
  constructor(private alertsService: AlertsService) {}

  public async addActivity(): Promise<void> {
    if (!this.checkValidity()) {
      this.alertsService.simpleAlert(this.errorMessage);
      return;
    }
    if (this.activityBeingEdited) {
      const index = this.activities.findIndex(
        (activity) => activity.id === this.activityBeingEdited.id
      );
      this.activities[index].title = this.nameValue;
      this.resetForm();
      this.modal.dismiss();
      return;
    }
    this.activities.push({
      title: this.nameValue,
      status: 'pending',
      createdAt: getInitialDateISOString(),
      streak: 0,
      id: getRandomID(),
    });

    this.modal.dismiss();
    this.nameValue = null;
  }

  public enableEditMode(activity: IActivityItem): void {
    this.activityBeingEdited = activity;
    this.nameValue = activity.title;
    this.modal.present();
  }

  public deleteActivity(id: string): void {
    this.activities = this.activities.filter(activity => activity.id !== id);
  }

  private checkValidity(): boolean {
    return this.nameValue && this.nameValue.length >= 3;
  }

  private resetForm(): void {
    this.nameValue = null;
    this.activityBeingEdited = null;
  }
}
