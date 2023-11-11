import { Injectable } from '@angular/core';
import { AlertButton, AlertController, AlertOptions } from '@ionic/angular';
import { RolesEnum } from '@shared/enums/roles.enum';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  constructor(private alertCtrl: AlertController) {}

  public async simpleAlert(header: string, subHeader?: string): Promise<HTMLIonAlertElement> {
    const button = ['Entendido'];
    const options = {
      header,
      subHeader,
      buttons: button
    };
    return this.alertBuilder({ ...options });
  }

  public async confirmationAlert(options: {
    header: string;
    subHeader?: string;
    cancelText?: string;
    confirmText?: string;
  }): Promise<boolean> {
    const { cancelText, confirmText, ...rest } = options;
    const btnCancelText = cancelText || 'Cancelar';
    const btnConfirmText = confirmText || 'Confirmar';

    const buttons: AlertButton[] = [
      {
        text: btnCancelText,
        role: RolesEnum.CANCEL
      },
      {
        text: btnConfirmText,
        role: RolesEnum.CONFIRM
      }
    ];

    const alert = await this.alertBuilder({ ...rest, buttons });

    const { role } = await alert.onDidDismiss();

    return role === RolesEnum.CONFIRM;
  }

  /** Closes every alert that is active at the moment of calling*/
  public async closeAll(): Promise<void> {
    const topAlert = await this.alertCtrl.getTop();
    if (topAlert) {
      await topAlert.dismiss();
      await this.closeAll();
    }
  }

  private async alertBuilder(options: AlertOptions): Promise<HTMLIonAlertElement> {
    const alert = await this.alertCtrl.create(options);
    await alert.present();
    return alert;
  }
}
