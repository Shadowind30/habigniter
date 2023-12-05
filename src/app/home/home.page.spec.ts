import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { HomePage } from './home.page';
import { LocalDBService } from '@shared/providers/external/local-db.service';
import { InternalClockServiceMock, LocalDBServiceMock } from '@mocks';
import { AlertsService } from '@shared/providers/utilities/alerts.service';
import { InternalClockService } from '@shared/providers/core/internal-clock.service';
import { IActivityItem } from '@shared/models';
import { DBKeysEnum } from '@shared/enums/db-keys.enum';
import { ModalController } from '../../../__mocks__/@ionic/angular/modal-controller';
import { Subscription } from 'rxjs';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let localDBService: jasmine.SpyObj<LocalDBService>;
  let alertService: jasmine.SpyObj<AlertsService>;

  const activitiesMock: IActivityItem[] = [
    {
      title: 'local',
      status: 'completed',
      createdAt: '2023-11-12',
      streak: 2,
      id: '6071d872-c53d-496b-9ddb-12535d9c89c3'
    }
  ];

  beforeEach(async () => {
    const localDBSpy = jasmine.createSpyObj('LocalDBService', ['saveData', 'getActivities']);
    const alertServiceSpy = jasmine.createSpyObj('AlertsService', ['simpleAlert', 'confirmationAlert']);

    TestBed.configureTestingModule({
      providers: [
        { provide: LocalDBService, useValue: localDBSpy },
        { provide: InternalClockService, useValue: InternalClockServiceMock },
        { provide: AlertsService, useValue: alertServiceSpy }
      ]
    });

    localDBService = TestBed.inject(LocalDBService) as jasmine.SpyObj<LocalDBService>;
    alertService = TestBed.inject(AlertsService) as jasmine.SpyObj<AlertsService>;

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.activities = [...activitiesMock];
    component.modal = ModalController as unknown as HTMLIonModalElement;
    component.activityBeingEdited = null;
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Tests for loadData', () => {
    
    it('should suscribe to the subject', async () => {
      spyOn(InternalClockServiceMock.onUpdateActivity, 'subscribe');
      InternalClockServiceMock.onUpdateActivity.next(0);
      await component.loadData();
      expect(InternalClockServiceMock.onUpdateActivity.subscribe).toHaveBeenCalled();
    });

    it('should call internalClockService.updateActivitiesState as times as days have passed', fakeAsync (() => {
      spyOn(InternalClockServiceMock, 'updateActivitiesState');
      InternalClockServiceMock.onUpdateActivity.next(5);
       component.loadData();
       tick(60000);
      expect(InternalClockServiceMock.updateActivitiesState).toHaveBeenCalledTimes(5);
    }));

    it('should show populate the activities array', async () => {
      component.activities = [];
      (localDBService.getActivities as any).and.returnValue([...activitiesMock])
      await component.loadData();
      expect(component.activities.length).toBe(1);
      expect(localDBService.getActivities).toHaveBeenCalled();
    });

    it('should call internalClockService.initialize', async () => {
      spyOn(InternalClockServiceMock, 'initialize' as any)
      await component.loadData();
      expect(InternalClockServiceMock.initialize).toHaveBeenCalled();
    });

  });

  describe('Tests for addActivity', () => {
    it('should show alert and make no changes if the name is invalid', async () => {
      component.nameValue = null;
      component.activities = [];

      alertService.simpleAlert.and.resolveTo({} as unknown as HTMLIonAlertElement);
      await component['addActivity']();
      expect(alertService.simpleAlert).toHaveBeenCalled();
      expect(component.activities.length).toBe(0);
    });

    it('should update the activity if edition mode was on', async () => {
      component.activityBeingEdited = { ...component.activities[0] };
      component.nameValue = 'Walk 2 KM in the morning';

      await component['addActivity']();

      const editedActivity = component.activities[0];
      expect(editedActivity.title).toBe('Walk 2 KM in the morning');
    });

    it('should create the activity if edition mode was off', async () => {
      component.activities = [];
      component.nameValue = 'Write unit tests';

      await component.addActivity();

      const createdActivity = component.activities[0];
      expect(component.activities.length).toBe(1);
      expect(createdActivity).toBeTruthy();
      expect(createdActivity.title).toBe('Write unit tests');
      expect(createdActivity.streak).toBe(0);
      expect(createdActivity.status).toBe('pending');
    });

    it('should dismiss the modal when done', async () => {
      component.nameValue = 'abcde';
      spyOn(ModalController, 'dismiss');
      await component.addActivity();
      expect(ModalController.dismiss).toHaveBeenCalled();
    });
  });

  describe('Tests for enableEditMode', () => {
    const activityToEdit = activitiesMock[0];
    it('should populate the form with the activity to edit', async () => {
      await component.enableEditMode(activityToEdit);
      expect(component.activityBeingEdited).toEqual(activityToEdit);
      expect(component.nameValue).toEqual(activityToEdit.title);
    });
    it('should present the modal', async () => {
      spyOn(ModalController, 'present');
      await component.enableEditMode(activityToEdit);
      expect(ModalController.present).toHaveBeenCalled();
    });
  });

  describe('Tests for deleteActivity', () => {
    const activityToDelete = { ...activitiesMock[0] };
    it('should do nothing if the user clicks "no" on the confirmation alert', async () => {
      alertService.confirmationAlert.and.resolveTo(false);
      await component.deleteActivity(activityToDelete.id);
      expect(alertService.confirmationAlert).toHaveBeenCalled();
      expect(component.activities.length).toEqual(1);
    });

    it('should remove the activity if the user clicks "yes" on the confirmation alert', async () => {
      alertService.confirmationAlert.and.resolveTo(true);
      spyOn(component, 'saveActivities' as any)
      
      await component.deleteActivity(activityToDelete.id);
      expect(alertService.confirmationAlert).toHaveBeenCalled();
      expect(component.activities.length).toEqual(0);
      expect(component['saveActivities']).toHaveBeenCalled();
    });
  });

  describe('Tests for saveActivties', () => {
    it('should save the current activities', async () => {
      await component['saveActivities']();
      expect(localDBService.saveData).toHaveBeenCalledWith(DBKeysEnum.ACTIVITIES, activitiesMock);
    });
  });

  describe('Tests for checkValidity', () => {
    it('should return false if the field is empty', () => {
      component.nameValue = null;
      const isValid = component['checkValidity']();
      expect(isValid).toBeFalse();
    });

    it('should return false if the field is less than 3 characters long', () => {
      component.nameValue = 'ab';
      const isValid = component['checkValidity']();
      expect(isValid).toBeFalse();
    });

    it('should return true if the field is 3 or more characters long', () => {
      component.nameValue = 'abc';
      const isValid = component['checkValidity']();
      expect(isValid).toBeTrue();

      component.nameValue = 'abcde';
      const isValid2 = component['checkValidity']();
      expect(isValid2).toBeTrue();
    });
  });

  describe('Tests for resetForm', () => {
    it('should clear the form and the activity being edited', () => {
      component.nameValue = 'Walk 1 KM';
      component.activityBeingEdited = {
        id: '3423424-dfsdf34-sd',
        title: 'Walk 1 KM',
        createdAt: '2023-12-05',
        status: 'pending',
        streak: 5
      };
      component.resetForm();
      expect(component.nameValue).toBeNull();
      expect(component.activityBeingEdited).toBeNull();
    });
  });

  describe('Tests for completeActivity', () => {
    it('should mark the activity as completed', () => {
      component.completeActivity(0);
      expect(component.activities[0].status).toBe('completed');
    });

    it('should call saveActivities', () => {
      spyOn(component, 'saveActivities' as any)
      component.completeActivity(0);
      expect(component['saveActivities']).toHaveBeenCalled();
    })
  });
});
