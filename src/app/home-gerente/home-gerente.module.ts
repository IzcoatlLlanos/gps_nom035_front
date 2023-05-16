import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeGerentePageRoutingModule } from './home-gerente-routing.module';

import { HomeGerentePage } from './home-gerente.page';
import { pdfMake } from 'pdfmake/build/vfs_fonts';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HomeGerentePageRoutingModule
  ],
  declarations: [HomeGerentePage]
})
export class HomeGerentePageModule {}
