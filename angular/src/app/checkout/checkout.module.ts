import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckoutPage } from './checkout.page';
import { CheckoutPageRoutingModule } from './checkout-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
   CheckoutPageRoutingModule,
  ],
  declarations: [CheckoutPage]
})
export class CheckoutPageModule {}
