import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

const imports = [IonicModule, FormsModule, CommonModule, TranslateModule];

@NgModule({
  imports,
  exports: [imports],
})
export class SharedModule {}
