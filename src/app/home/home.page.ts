import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { IActivityItem } from '@shared/models';
import { AlertsService } from '@shared/providers/utilities/alerts.service';
import { getDate, getRandomID } from '@shared/utilities/helpers.functions';
import { LocalDbService } from '@shared/providers/external/local-db.service';
import { DBKeysEnum } from '@shared/enums/db-keys.enum';
import { InternalClockService } from '@shared/providers/core/internal-clock.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class HomePage implements OnInit {
  @ViewChild('form') modal: HTMLIonModalElement;
  public modalHeight = 260 / window.innerHeight;
  public nameValue: string;
  public errorMessage = 'El nombre debe de contener al menos 3 caracteres';

  public activities: IActivityItem[] = [];
  public activityBeingEdited: IActivityItem;

  private alertsService = inject(AlertsService);
  private localDBService = inject(LocalDbService);
  private internalClockService = inject(InternalClockService);

  public ngOnInit(): void {
    this.internalClockService.onUpdateActivity.subscribe(() => {
      this.activities = this.internalClockService.updateActivitiesState(this.activities);
    });
    this.activities = this.localDBService.Activities;
    this.internalClockService.initialize();
  }

  public async addActivity(): Promise<void> {
    if (!this.checkValidity()) {
      this.alertsService.simpleAlert(this.errorMessage);
      return;
    }
    if (this.activityBeingEdited) {
      const index = this.activities.findIndex((activity) => activity.id === this.activityBeingEdited.id);
      this.activities[index].title = this.nameValue;
      this.resetForm();
      this.modal.dismiss();
      this.saveActivities();
      return;
    }
    this.activities.push({
      title: this.nameValue,
      status: 'pending',
      createdAt: getDate(),
      streak: 0,
      id: getRandomID()
    });

    this.modal.dismiss();
    this.nameValue = null;
    this.saveActivities();
  }

  public enableEditMode(activity: IActivityItem): void {
    this.activityBeingEdited = activity;
    this.nameValue = activity.title;
    this.modal.present();
  }

  public async deleteActivity(id: string): Promise<void> {
    const shouldContinue = await this.alertsService.confirmationAlert({
      header: 'Deseas borrar este habito?',
      subHeader: 'Esta accion no se puede deshacer',
      confirmText: 'Eliminar'
    });
    if (!shouldContinue) return;
    this.activities = this.activities.filter((activity) => activity.id !== id);
    this.saveActivities();
  }

  public completeActivity(index: number): void {
    this.activities[index].streak++;
    this.activities[index].status = 'completed';
    this.saveActivities();
  }

  public resetForm(): void {
    this.nameValue = null;
    this.activityBeingEdited = null;
  }
  private checkValidity(): boolean {
    return this.nameValue && this.nameValue.length >= 3;
  }

  private async saveActivities(): Promise<void> {
    this.localDBService.saveData(DBKeysEnum.ACTIVITIES, this.activities);
  }
}
