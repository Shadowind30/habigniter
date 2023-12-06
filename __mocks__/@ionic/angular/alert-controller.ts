import { AlertOptions } from '@ionic/angular';

export const AlertControllerMock = {
    async create(options: AlertOptions) {
      return {
        ...options,
        present(){},
        dismiss(){}
      } as HTMLIonAlertElement;
    },
    async getTop(): Promise<HTMLIonAlertElement> {
      return {
        dismiss(){}
      } as unknown as HTMLIonAlertElement;
    },
    async dismiss(data?: any, role?: any, alert?: HTMLIonAlertElement): Promise<boolean> {
     return Promise.resolve(true)
    }
  };
  