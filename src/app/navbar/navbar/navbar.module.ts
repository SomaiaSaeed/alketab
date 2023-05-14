import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarRoutingModule } from './navbar-routing.module';
import {HolyQuranComponent} from '../../holy-quran/holy-quran.component';
import {NavbarComponent} from '../navbar.component';
import {DynamicAyaComponent} from '../../dynamic-aya/dynamic-aya.component';
import {DropdownModule} from 'primeng/dropdown';
import {FormsModule} from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import {MenuModule} from 'primeng/menu';

import {SidebarModule} from 'primeng/sidebar';
import {GridModule} from "../../grid/grid/grid.module";
import {ColorPickerModule} from "primeng/colorpicker";
import {ContextMenuModule} from "primeng/contextmenu";
import {ButtonModule} from 'primeng/button';
import {InputNumberModule} from 'primeng/inputnumber';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {InputTextareaModule} from 'primeng/inputtextarea';

@NgModule({
  declarations: [HolyQuranComponent, NavbarComponent,DynamicAyaComponent],
  imports: [
    CommonModule,
    SidebarModule,
    NavbarRoutingModule,
    DropdownModule,
    FormsModule,
    MenuModule,
    DialogModule,
     GridModule,
    ColorPickerModule,
     ContextMenuModule,
    ButtonModule,
    InputNumberModule,
    MessagesModule,
    MessageModule,
    InputTextareaModule
  ]
})
export class NavbarModule { }
