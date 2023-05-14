import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResponderPageRoutingModule } from './responder-routing.module';

import { ResponderPage } from './responder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ResponderPageRoutingModule
  ],
  declarations: [ResponderPage]
})
export class ResponderPageModule {}
