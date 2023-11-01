import { Component, ViewChild } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { IActivityItem } from '@shared/models';
import { AlertsService } from '@shared/utilities/alerts.service';
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
  constructor(private alertsService: AlertsService) {}

  public async addActivity(): Promise<void> {
    if (!this.checkValidity()) {
      this.alertsService.simpleAlert(this.errorMessage);
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

  private checkValidity(): boolean {
    return this.nameValue && this.nameValue.length >= 3;
  }
}
