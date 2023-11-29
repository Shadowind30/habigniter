import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { LocalDbService } from '@shared/providers/external/local-db.service';
import { NavController } from '@ionic/angular';
import { LocalDBServiceMock, NavControllerMock } from '@mocks';

describe('AppComponent', () => {
  it('should create the app', () => {
    TestBed.overrideComponent(AppComponent, {
      add: {
        imports: [RouterTestingModule],
        providers: [
          { provide: LocalDbService, useValue: LocalDBServiceMock },
          { provide: NavController, useValue: NavControllerMock }
        ]
      }
    });
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
