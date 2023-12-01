import { ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { LocalDBService } from '@shared/providers/external/local-db.service';
import { NavController } from '@ionic/angular';
import { LocalDBServiceMock, NavControllerMock } from '@mocks';
import { SplashScreen } from '@capacitor/splash-screen';

describe('AppComponent', () => {
  let app: AppComponent;
  let localDBService: LocalDBService;
  let navCtrlService: NavController;
  beforeEach(() => {
    localDBService = new LocalDBServiceMock();
    navCtrlService = new NavControllerMock() as NavController;
    app = new AppComponent(localDBService, navCtrlService);
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  describe('Tests for init data', () => {
    it('should initialize the local DB', async () => {
      spyOn(localDBService, 'init');
      await app['initData']();
      expect(localDBService.init).toHaveBeenCalled();
    });

    it('should navigate home', async () => {
      spyOn(navCtrlService, 'navigateRoot');
      await app['initData']();
      expect(navCtrlService.navigateRoot).toHaveBeenCalledWith('/home');
    });

    it('should hide the splashcreen', async () => {
      spyOn(SplashScreen, 'hide');
      await app['initData']();
      expect(SplashScreen.hide).toHaveBeenCalled();
    });
  });
});
