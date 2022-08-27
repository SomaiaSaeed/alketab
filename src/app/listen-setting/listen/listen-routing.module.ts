import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListenSettingComponent} from '../listen-setting.component';



const routes: Routes = [
  {path:'',component:ListenSettingComponent}
];@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListenRoutingModule { }
