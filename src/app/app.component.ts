import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { LocalDbService } from '@shared/providers/external/local-db.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class AppComponent {
  constructor(private localDBService: LocalDbService) {
    this.localDBService.loadData();
  }
}
