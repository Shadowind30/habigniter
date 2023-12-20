import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { COMPONENTS } from './components/components.index';
import { MODALS } from './modals/modals.index';
import { TranslateModule } from '@ngx-translate/core';

const declarations = [...COMPONENTS, ...MODALS];
const imports = [IonicModule, FormsModule, CommonModule, TranslateModule];

@NgModule({
  declarations,
  imports,
  exports: [declarations, imports],
})
export class SharedModule {}
