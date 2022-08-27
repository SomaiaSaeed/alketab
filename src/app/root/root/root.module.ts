import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RootRoutingModule } from './root-routing.module';
import {OrderListModule} from 'primeng/orderlist';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@NgModule({
  declarations: [],   schemas: [CUSTOM_ELEMENTS_SCHEMA ],

  imports: [
    CommonModule,
    RootRoutingModule,OrderListModule
  ]
})
export class RootModule { }
