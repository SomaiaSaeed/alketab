import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListenRoutingModule } from './listen-routing.module';
import {ListenSettingComponent} from '../listen-setting.component';
import {DropdownModule} from 'primeng/dropdown';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [ListenSettingComponent],
  imports: [
    CommonModule,FormsModule,
    ListenRoutingModule,
    DropdownModule
  ]
})
export class ListenModule { }
