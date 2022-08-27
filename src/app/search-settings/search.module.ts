import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DropdownModule} from 'primeng/dropdown';
import {AutoCompleteModule} from "primeng/autocomplete";
import { SearchSettingsRoutingModule } from './search-settings-routing.module';
import { SearchSettingsComponent } from './search-settings.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [SearchSettingsComponent],
  imports: [
    CommonModule,
    SearchSettingsRoutingModule,
    DropdownModule,
    AutoCompleteModule,
    FormsModule
  ]
})
export class SearchSettingsModule { }
