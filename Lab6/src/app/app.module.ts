import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {EulerMethodService} from "./EulerMethod.service";
import {MilneMethodService} from "./MilneMethod.service";
import {FormsModule} from "@angular/forms";
import {ChartistModule} from "ng-chartist";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ChartistModule
  ],
  providers: [
    EulerMethodService,
    MilneMethodService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
