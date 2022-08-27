import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GridComponent} from "../grid.component";
import {TableModule} from 'primeng/table';
import {FormsModule} from '@angular/forms';
import {ExportService} from "../export.service";
// import {ExportService} from "../export.service";


@NgModule({
  declarations: [GridComponent],
  exports: [
    GridComponent
  ],
  imports: [
    CommonModule,TableModule,FormsModule
  ],
  // providers: [ExportService],

})
export class GridModule { }
