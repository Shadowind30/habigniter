import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';
import { IActivityItem } from '@shared/models';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class HomePage {
  public activities: IActivityItem[] = [{
    title: 'Read 20 pages of a book',
    status: 'pending',
    createdAt: '2020-01-01T00:00:00.000Z',
    streak: 0,
    id: '1'
  }];
  constructor() {}
}
