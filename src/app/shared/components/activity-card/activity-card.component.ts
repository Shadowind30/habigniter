import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IActivityItem, ITask } from '@shared/models';

@Component({
  selector: 'app-activity-card',
  templateUrl: './activity-card.component.html',
  styleUrls: ['./activity-card.component.scss']
})
export class ActivityCardComponent implements OnInit {
  @Output() public edit = new EventEmitter<void>();
  @Output() public delete = new EventEmitter<void>();
  @Output() public completeEvent = new EventEmitter<void>();
  @Input() public activity: IActivityItem;

  constructor() {}

  public get progress(): number {
    if(!('tasks' in this.activity)) return 100;
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
