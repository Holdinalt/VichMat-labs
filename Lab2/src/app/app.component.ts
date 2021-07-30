import {Component, OnInit} from '@angular/core';
import {HalfDivisionMethodService} from './halfDivisionMethod.service';
import {Equation} from './Equation';
import {NewtonsMethodService} from './NewtonsMethod.service';
import {ChartistComponent} from 'ng-chartist';

import {
  IBarChartOptions,
  IChartistAnimationOptions,
  IChartistData
} from 'chartist';
import { ChartEvent, ChartType } from 'ng-chartist';
import {ChardData} from './ChardData';
import {SimpleIterationMethodService} from './SimpleIterationMethod.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent{

  type: ChartType = 'Line';
  data: IChartistData = {
    labels: [],
    series: []
  };

  options: IBarChartOptions = {
    axisX: {

      onlyInteger: true,
    },
    height: 300,
    onlyInteger: true
  };

  events: ChartEvent = {
    draw: (data) => {
      if (data.type === 'bar') {
        data.element.animate({
          y2: <IChartistAnimationOptions>{
            dur: '0.5s',
            from: data.y1,
            to: data.y2,
            easing: 'easeOutQuad'
          }
        });
      }
    }
  };


  title = 'Lab2-VichMat';

  outTable: number[][];

  equal = new Equation();

  // N = 10;

  a = -2;
  b = -1;
  E = 0.01;

  constructor(private halfDivision: HalfDivisionMethodService,
              private newtonsMethod: NewtonsMethodService,
              private simpleMethod: SimpleIterationMethodService) {
  }

  methods = [{name: 'Метод полинного деления', id: 0},
             {name: 'Метод Ньютона', id: 1},
             {name: 'Метод простых итераций', id: 2},
              ];

  selectedMethod = this.methods[0];

  changeMethod(method): void{
    this.selectedMethod = method;
  }

  checkForExistence(equal: Equation, a: number, b: number): boolean{
    if (equal.getResult(a) * equal.getResult(b) < 0){
      switch (this.selectedMethod.id) {
        case 0: {
          return true;
        }
        case 1: {
          return this.newtonsMethod.checkForExistence(equal, a, b);
        }
        case 2: {
          return this.simpleMethod.checkForExistence(equal, a, b);
        }
      }
    }

    return false;
  }

  execute(): void{
    if (!this.checkForExistence(this.equal, this.a, this.b)){
      alert('Нарушены условия сходимсоти, измените диапазон');
    }else {
      switch (this.selectedMethod.id) {
        case 0: {
          console.log('Divide');
          this.outTable = this.halfDivision.execute(this.a, this.b, this.E, this.equal);
          console.log(this.outTable);
          break;
        }
        case 1: {
          console.log('Newton');
          this.outTable = this.newtonsMethod.execute(this.a, this.b, this.E, this.equal);
          console.log(this.outTable);
          break;
        }
        case 2: {
          console.log('Simple iterations');
          this.outTable = this.simpleMethod.execute(this.a, this.b, this.E, this.equal);
          console.log(this.outTable);
          break;
        }
      }
    }
    let chardData: ChardData;
    chardData = this.getChardData(this.a, this.b, this.equal);

    this.data.series = chardData.series;
    this.data.labels = chardData.labels;
  }

  getChardData(a: number, b: number, equal: Equation): any{
    const data: ChardData = new ChardData();
    let temp: number[] = [];
    const separator: number = Math.abs(a - b) / 10;
    for (let i = a * 10; i <= b * 10; i = i + separator * 10){
      data.labels.push(i / 10);
      if (temp.length === 0){
        temp = [equal.getResult(i / 10)];
      } else {
        temp.push(equal.getResult(i / 10));
      }
    }
    data.series.push(temp);
    return data;
  }

  eraseChart(): void{
    this.outTable = [];
    this.data.series = [];
    this.data.labels = [];
  }


}
