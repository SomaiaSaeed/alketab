import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {QoraaComponent} from "../qoraa.component";

const routes: Routes = [ {
  path: '',
  component: QoraaComponent,
},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QoraaRoutingModule { }
