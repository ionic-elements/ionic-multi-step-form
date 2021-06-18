import { NgModule } from '@angular/core';
import { ThanksPage } from './thanks.page';
import { ThanksPageRoutingModule } from './thanks-routing.module';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    ThanksPage,
  ],
  imports: [
    CommonModule,
    IonicModule,
    ThanksPageRoutingModule,
  ],
})
export class ThanksPageModule {}
