import { Component } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { IonicModule, NavController } from '@ionic/angular';
import { LocalDbService } from '@shared/providers/external/local-db.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class AppComponent {
  constructor(
    private localDBService: LocalDbService,
    private navCtrl: NavController
  ) {
    this.initData();
  }

  private async initData(): Promise<void> {
    this.navCtrl.navigateRoot('/home');
    await this.localDBService.init();
    await this.navCtrl.navigateRoot('/home');
  }

  // internalClockSimulator() {
  //   let date = 20231105;
  //   document.addEventListener('keydown', (event) => {
  //     if (event.key === 'n') {
  //       date++;
  //       this.localDBService.saveData(DBKeysEnum.SAVED_DAY, date);
  //     }
  //   });
  // }
}
