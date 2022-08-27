import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SearchSettingsComponent} from "./search-settings.component";


const routes: Routes = [
  {path:'',component:SearchSettingsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchSettingsRoutingModule { }
