import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListenRoutingModule } from './listen-routing.module';
import {ListenSettingComponent} from '../listen-setting.component';
import {DropdownModule} from 'primeng/dropdown';


@NgModule({
  declarations: [ListenSettingComponent],
  imports: [
    CommonModule,
    ListenRoutingModule,
    DropdownModule
  ]
})
export class ListenModule { }
