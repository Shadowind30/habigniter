import { AlertsService } from './alerts.service';
import { AlertController } from '@ionic/angular';
import { AlertControllerMock } from '../../../../../__mocks__/@ionic/angular/alert-controller';
import { RolesEnum } from '@shared/enums/roles.enum';

describe('AlertsService', () => {
  let service: AlertsService;

  beforeEach(() => {
    service = new AlertsService(AlertControllerMock as unknown as AlertController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Tests for simpleAlert', () => {
    it('should create the alert with only header', async () => {
      const alert = await service.simpleAlert('header');
      expect(alert.header).toBe('header');
      expect(alert.buttons).toEqual(['Entendido']);
    });

    it('should create the alert with header and sub-header', async () => {
      const alert = await service.simpleAlert('header', 'sub-header');
      expect(alert.header).toBe('header');
      expect(alert.subHeader).toBe('sub-header');
      expect(alert.buttons).toEqual(['Entendido']);
    });

    it('should call alertBuilder', async () => {
      spyOn(service, 'alertBuilder' as any);
      await service.simpleAlert('header');
      expect(service['alertBuilder']).toHaveBeenCalled();
    });
  });

  describe('Tests for confirmationAlert', () => {
    it('should call alertBuilder with the default buttons if no custom value was provided', async () => {
      const mockAlert: Partial<HTMLIonAlertElement> = {
        onDidDismiss: () => Promise.resolve({ role: RolesEnum.CANCEL })
      };
      spyOn(service, 'alertBuilder' as any).and.returnValue(mockAlert);
      await service.confirmationAlert({ header: 'do you want to continue?' });
      expect(service['alertBuilder']).toHaveBeenCalledWith({
        header: 'do you want to continue?',
        buttons: [
          { text: 'Cancelar', role: RolesEnum.CANCEL },
          { text: 'Confirmar', role: RolesEnum.CONFIRM }
        ]
      });
    });

    it('should call alertBuilder with the custom buttons if custom values were provided', async () => {
      const mockAlert: Partial<HTMLIonAlertElement> = {
        onDidDismiss: () => Promise.resolve({ role: RolesEnum.CANCEL })
      };
      spyOn(service, 'alertBuilder' as any).and.returnValue(mockAlert);
      await service.confirmationAlert({ header: 'do you want to continue?', cancelText: 'No', confirmText: 'Yes' });
      expect(service['alertBuilder']).toHaveBeenCalledWith({
        header: 'do you want to continue?',
        buttons: [
          { text: 'No', role: RolesEnum.CANCEL },
          { text: 'Yes', role: RolesEnum.CONFIRM }
        ]
      });
    });

    it('should return false if the "no" button is clicked', async () => {
      const mockAlert: Partial<HTMLIonAlertElement> = {
        onDidDismiss: () => Promise.resolve({ role: RolesEnum.CANCEL })
      };
      spyOn(service, 'alertBuilder' as any).and.returnValue(mockAlert);
      const result = await service.confirmationAlert({ header: 'do you want to continue?' });
      expect(result).toBe(false);
    });

    it('should return false if the "yes" button is clicked', async () => {
      const mockAlert: Partial<HTMLIonAlertElement> = {
        onDidDismiss: () => Promise.resolve({ role: RolesEnum.CONFIRM })
      };
      spyOn(service, 'alertBuilder' as any).and.returnValue(mockAlert);
      const result = await service.confirmationAlert({ header: 'do you want to continue?' });
      expect(result).toBe(true);
    });
  });

  describe('Tests for closeAll', () => {
    it('should not close any alert if there are no alerts', async () => {
      const getTopSpy = spyOn(AlertControllerMock, 'getTop').and.returnValue(Promise.resolve(null));
      const dismissSpy = spyOn(AlertControllerMock, 'dismiss');

      await service.closeAll();

      expect(getTopSpy).toHaveBeenCalled();
      expect(dismissSpy).not.toHaveBeenCalled();
    });

    it('should close the top alert and call itself recursively', async () => {
      const mockAlert: HTMLIonAlertElement = {
        dismiss: jasmine.createSpy('dismiss')
      } as unknown as HTMLIonAlertElement;

      const mockAlert2: HTMLIonAlertElement = {
        dismiss: jasmine.createSpy('dismiss')
      } as unknown as HTMLIonAlertElement;

      const getTopSpy = spyOn(AlertControllerMock, 'getTop').and.returnValues(
        Promise.resolve(mockAlert2),
        Promise.resolve(mockAlert),
        Promise.resolve(null)
      );

      await service.closeAll();

      expect(getTopSpy).toHaveBeenCalledTimes(3);
      expect(mockAlert2.dismiss).toHaveBeenCalled();
      expect(mockAlert.dismiss).toHaveBeenCalled();
    });
  });
  describe('Tests for alertBuilder', () => {
    it('should create the alert', async () => {
      const options = {
        header: 'header',
        subHeader: 'sub-header',
        buttons: ['ok']
      };

      const mockAlert: HTMLIonAlertElement = {
        present: jasmine.createSpy('present'),
        ...options
      } as unknown as HTMLIonAlertElement;

      const createSpy = spyOn(AlertControllerMock, 'create').and.returnValue(Promise.resolve(mockAlert));

      const alert = await service['alertBuilder']({ ...options });

      expect(createSpy).toHaveBeenCalledWith(options);
      expect(mockAlert.present).toHaveBeenCalled();
      expect(alert.header).toBe(options.header);
      expect(alert.subHeader).toBe(options.subHeader);
      expect(alert.buttons).toBe(options.buttons);
    });
  });
});
