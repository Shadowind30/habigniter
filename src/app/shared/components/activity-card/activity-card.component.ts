import { Component, Input, OnInit } from '@angular/core';
import { IActivityItem } from '@shared/models';

@Component({
  selector: 'app-activity-card',
  templateUrl: './activity-card.component.html',
  styleUrls: ['./activity-card.component.scss'],
})
export class ActivityCardComponent  implements OnInit {

  @Input() public activity: IActivityItem;

  constructor() { }

  ngOnInit() {
    console.log(this.activity);
  }

}
