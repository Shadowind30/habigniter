import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { IActivityItem, ITask } from '@shared/models';
import { AlertsService } from '@shared/providers/utilities/alerts.service';
import { getDate, getRandomID } from '@shared/utilities/helpers.functions';
import { LocalDBService } from '@shared/providers/external/local-db.service';
import { DBKeysEnum } from '@shared/enums/db-keys.enum';
import { InternalClockService } from '@shared/providers/core/internal-clock.service';
import { Subject, Subscription, debounceTime, takeUntil } from 'rxjs';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDragPreview, CdkDragPlaceholder } from '@angular/cdk/drag-drop';
import { FormActionsEnum } from '@shared/enums/actions.enums';
import { ModalController } from '@ionic/angular';
import { ActivityFormComponent } from '@shared/modals/activity-form/activity-form.component';
import { RolesEnum } from '@shared/enums/roles.enum';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [SharedModule, CdkDropList, CdkDrag, CdkDragPlaceholder, CdkDragPreview]
})
export class HomePage implements OnInit, OnDestroy {
  public modalHeight = 260 / window.innerHeight;
  public action = FormActionsEnum;

  public activities: IActivityItem[] = [];

  private alertsService = inject(AlertsService);
  private localDBService = inject(LocalDBService);
  private internalClockService = inject(InternalClockService);
  private modalCtrl = inject(ModalController);

  private destroy$ = new Subject<void>();
  private updateSub: Subscription;

  public ngOnInit(): void {
    this.loadData();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.updateSub.unsubscribe();
  }

  public loadData() {
    this.updateSub = this.internalClockService.onUpdateActivity
      .pipe(debounceTime(60000), takeUntil(this.destroy$))
      .subscribe((daysSince) => {
        for (let i = 0; i < daysSince; i++) {
          this.activities = this.internalClockService.updateActivitiesState(this.activities);
        }
      });
    this.activities = this.localDBService.getActivities();
    this.internalClockService.initialize();
    console.log(this.activities);
  }

  public async openActivityForm(action: FormActionsEnum, activity?: IActivityItem): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: ActivityFormComponent,
      cssClass: 'auto-height',
      componentProps: {
        action,
        activity
      }
    });

    await modal.present();

    const { data: formActivity, role } = await modal.onWillDismiss();

    if (!formActivity || role !== RolesEnum.CONFIRM) return;

    if (action === FormActionsEnum.CREATE) {
      this.activities.unshift(formActivity);
      this.saveActivities();
    }

    if (action === FormActionsEnum.EDIT) {
      const index = this.activities.findIndex((activity) => activity.id === formActivity.id);
      this.activities[index] = formActivity;
      this.saveActivities();
    }
  }

  public onItemDrop(event: CdkDragDrop<IActivityItem[]>): void {
    const { previousIndex, currentIndex } = event;
    const item = this.activities[previousIndex];
    this.activities.splice(previousIndex, 1);
    this.activities.splice(currentIndex, 0, item);
    this.saveActivities();
  }

  public completeActivity(index: number): void {
    this.activities[index].streak++;
    this.activities[index].status = 'completed';
    this.saveActivities();
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

  private async saveActivities(): Promise<void> {
    this.localDBService.saveData(DBKeysEnum.ACTIVITIES, this.activities);
  }
}
