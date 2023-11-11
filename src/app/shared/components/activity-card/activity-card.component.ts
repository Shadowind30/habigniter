import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IActivityItem } from '@shared/models';

@Component({
  selector: 'app-activity-card',
  templateUrl: './activity-card.component.html',
  styleUrls: ['./activity-card.component.scss']
})
export class ActivityCardComponent implements OnInit {
  @Output() public edit = new EventEmitter<void>();
  @Output() public delete = new EventEmitter<void>();
  @Output() public complete = new EventEmitter<void>();
  @Input() public activity: IActivityItem;

  constructor() {}

  ngOnInit() {
    console.log(this.activity);
  }
}
