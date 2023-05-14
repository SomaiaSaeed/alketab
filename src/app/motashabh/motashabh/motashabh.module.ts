import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MotashabhRoutingModule } from './motashabh-routing.module';
import { MotashabhComponent } from '../motashabh.component';


@NgModule({
  declarations: [MotashabhComponent],
  imports: [
    CommonModule,
    MotashabhRoutingModule
  ]
})
export class MotashabhModule { }
