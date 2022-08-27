import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MotashabhComponent} from "../motashabh.component";

const routes: Routes = [ {
  path: 'motashabh',
  component: MotashabhComponent,
},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MotashabhRoutingModule { }
