import { Component, Input, OnInit, inject } from '@angular/core';
import { FormActionsEnum } from '@shared/enums/actions.enums';
import { RolesEnum } from '@shared/enums/roles.enum';
import { IActivityItem, ITask } from '@shared/models';
import { AlertsService } from '@shared/providers/utilities/alerts.service';
import { getDate, getRandomID } from '@shared/utilities/helpers.functions';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.scss'],
})
export class ActivityFormComponent  implements OnInit {

  @Input() public action: FormActionsEnum;
  @Input() public activity: IActivityItem;
  public actions = FormActionsEnum;
  
  public nameValue: string;
  public errorMessage = 'El nombre debe de contener al menos 3 caracteres';
  public minTasksMessage = 'Debes de agregar al menos dos tareas';

  public includeTasks: boolean;
  public taskName: string;
  public currentTasks: ITask[] = [];
  public taskBeingEdited: ITask;
  public disableTaskEdition: boolean;

  private alertsService = inject(AlertsService);
  private modal: HTMLIonModalElement;

  ngOnInit() {
    this.initForm()
  }

  public async saveActivity(): Promise<void> {
    if (!this.checkValidity(this.nameValue)) {
      this.alertsService.simpleAlert(this.errorMessage);
      return;
    }

    if (this.includeTasks && this.currentTasks.length < 2) {
      this.alertsService.simpleAlert(this.minTasksMessage);
      return;
    }

    const activityToSave: IActivityItem = {
      title: this.nameValue,
      status: this.action === FormActionsEnum.CREATE ? 'pending' : this.activity.status,
      createdAt: this.action === FormActionsEnum.CREATE ? getDate() : this.activity.createdAt,
      streak: this.action === FormActionsEnum.CREATE ? 0 : this.activity.streak,
      id: this.action === FormActionsEnum.CREATE ? getRandomID() : this.activity.id
    };

  
    if (this.includeTasks && this.currentTasks.length) {
      activityToSave.tasks = this.currentTasks;
    }

    this.modal.dismiss(activityToSave, RolesEnum.CONFIRM);
  }

  public async addTask(): Promise<void> {
    if (!this.checkValidity(this.taskName)) {
      this.alertsService.simpleAlert(this.errorMessage);
      return;
    }

    if (this.taskBeingEdited && this.currentTasks.length) {
      const index = this.currentTasks.findIndex((task) => task.id === this.taskBeingEdited.id);
      this.currentTasks[index].title = this.taskName;
      this.taskBeingEdited = null;
      this.taskName = null;
      return;
    }

    this.currentTasks.push({
      title: this.taskName,
      completed: false,
      id: getRandomID()
    });
    this.taskName = null;
  }

  public editTask(task: ITask): void {
    this.taskBeingEdited = task;
    this.taskName = task.title;
  }

  public async deleteTask(id: string): Promise<void> {
    this.currentTasks = this.currentTasks.filter((task) => task.id !== id);
  }

  public initForm(): void {
    if(this.action === FormActionsEnum.CREATE) return;
    const activity = this.activity;
    this.nameValue = activity.title;
    if('tasks' in activity) {
      this.includeTasks = true;
      this.currentTasks = activity.tasks;
      this.disableTaskEdition = activity.status === 'completed';
    }
  }


  private checkValidity(value: string): boolean {
    return !!value && value.length >= 3;
  }

}
