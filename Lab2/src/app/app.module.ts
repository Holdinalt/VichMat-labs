import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HalfDivisionMethodService} from './halfDivisionMethod.service';
import {FormsModule} from '@angular/forms';
import {NewtonsMethodService} from './NewtonsMethod.service';
import {ChartistModule} from 'ng-chartist';
import {SimpleIterationMethodService} from './SimpleIterationMethod.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ChartistModule
  ],
  providers: [HalfDivisionMethodService, NewtonsMethodService, SimpleIterationMethodService],
  bootstrap: [AppComponent]
})
export class AppModule { }
