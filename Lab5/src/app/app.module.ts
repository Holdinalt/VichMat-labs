import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {LagrangePolynomialService} from "./LagrangePolynomial.service";
import {NewtonPolynomialSeparatedDiffService1} from "./NewtonPolynomialSeparatedDiff.service";
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
  providers: [LagrangePolynomialService,
  NewtonPolynomialSeparatedDiffService1],
  bootstrap: [AppComponent]
})
export class AppModule { }
