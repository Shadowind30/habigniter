import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  IonButton,
  IonCard,
  IonCol,
  IonCardContent,
  IonGrid,
  IonIcon,
  IonLabel,
  IonRow,
  IonCardSubtitle,
  IonCardHeader,
  IonCardTitle,
  IonProgressBar,
  IonList,
  IonItem,
  IonCheckbox
} from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';
import { IActivityItem,  } from '@shared/models';

@Component({
  selector: 'app-activity-card',
  templateUrl: './activity-card.component.html',
  styleUrls: ['./activity-card.component.scss'],
  imports: [
    IonCardContent,
    IonCardSubtitle,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonIcon,
    IonLabel,
    IonButton,
    IonProgressBar,
    IonList,
    IonItem,
    IonCheckbox,
    TranslatePipe
  ]
})
export class ActivityCardComponent implements OnInit {
  @Output() public edit = new EventEmitter<void>();
  @Output() public delete = new EventEmitter<void>();
  @Output() public completeEvent = new EventEmitter<void>();
  @Input() public activity: IActivityItem;

  constructor() {}

  public get progress(): number {
    if (!('tasks' in this.activity)) return 100;
    const tasks = this.activity.tasks.length;
    const completed = this.activity.tasks.filter((task) => task.completed).length;
    return Math.round((completed / tasks) * 100);
  }

  ngOnInit() {
    console.log(this.activity);
  }

  public onTaskChange(index: number, event: any): void {
    const value = event.detail.checked;
    this.activity.tasks[index].completed = value;
  }
}
