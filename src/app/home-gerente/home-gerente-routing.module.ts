import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeGerentePage } from './home-gerente.page';

const routes: Routes = [
  {
    path: '',
    component: HomeGerentePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeGerentePageRoutingModule {}
