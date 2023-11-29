let MOCK_ALERT: HTMLIonAlertElement;

export const AlertsServiceMock = {
  confirmationAlert: (options: { header: string; subHeader?: string; cancelText?: string; confirmText?: string }): Promise<boolean> => Promise.resolve(true),
  simpleAlert: (options: {header: string, subHeader?: string}): Promise<HTMLIonAlertElement> => Promise.resolve(MOCK_ALERT)
};
