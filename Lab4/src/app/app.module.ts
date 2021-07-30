import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {LinearApproximationService} from './LinearApproximation.service';
import {QuadraticApproximationService} from './QuadraticApproximation.service';
import {ExponentialApproximationService} from './ExponentialApproximation.service';
import {LogarithmicApproximationService} from './LogarithmicApproximation.service';
import {PowerLawApproximationService} from './Power-lawApproximation.service';
import {FormsModule} from '@angular/forms';
import {ChartistModule} from 'ng-chartist';

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
    LinearApproximationService,
    QuadraticApproximationService,
    ExponentialApproximationService,
    LogarithmicApproximationService,
    PowerLawApproximationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
