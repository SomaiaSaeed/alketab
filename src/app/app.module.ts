import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { SliderComponent } from './slider/slider.component';
import {HttpClientModule} from '@angular/common/http';
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationService} from "primeng/api";
import {SlideMenuModule} from 'primeng/slidemenu';
import { RootComponent } from './root/root.component';
import { FooterComponent } from './footer/footer.component';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {TableModule} from 'primeng/table';
import {GridModule} from "./grid/grid/grid.module";
import {DropdownModule} from 'primeng/dropdown';



@NgModule({
  declarations: [
    AppComponent,
    SliderComponent,
    RootComponent,
    FooterComponent,
  ],
    imports: [
        BrowserModule, SlideMenuModule,
        AppRoutingModule,
        // DropdownModule,
        FormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ConfirmDialogModule, AutoCompleteModule, TableModule, GridModule, DropdownModule
    ],
  providers: [ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
