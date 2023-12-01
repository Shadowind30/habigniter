import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePage } from './home.page';
import { LocalDBService } from '@shared/providers/external/local-db.service';
import { AlertsServiceMock, InternalClockServiceMock, LocalDBServiceMock } from '@mocks';
import { AlertsService } from '@shared/providers/utilities/alerts.service';
import { InternalClockService } from '@shared/providers/core/internal-clock.service';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: LocalDBService, useValue: LocalDBServiceMock },
        { provide: AlertsService, useValue: AlertsServiceMock },
        { provide: InternalClockService, useValue: InternalClockServiceMock }
      ]
    });
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
