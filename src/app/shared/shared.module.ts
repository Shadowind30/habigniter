import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { COMPONENTS } from './components/components.index';

const declarations = [...COMPONENTS];
const imports = [IonicModule, FormsModule, CommonModule];

@NgModule({
  declarations,
  imports,
  exports: [declarations, imports]
})
export class SharedModule {}
