import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {RectangleMethodService} from './RectangleMethod.service';
import {TrapezoidMethodService} from './TrapezoidMethod.service';
import {SimpsonMethodService} from './SimpsonMethod.service';
import {Equation} from './Equation';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    BrowserModule
  ],
  providers: [
    RectangleMethodService,
    TrapezoidMethodService,
    SimpsonMethodService,
    Equation
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
