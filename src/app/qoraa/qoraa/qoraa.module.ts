import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QoraaRoutingModule } from './qoraa-routing.module';
import {QoraaComponent} from '../qoraa.component';


@NgModule({
  declarations: [QoraaComponent],
  imports: [
    CommonModule,
    QoraaRoutingModule
  ]
})
export class QoraaModule { }
