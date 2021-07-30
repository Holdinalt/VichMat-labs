import {Component, OnInit} from '@angular/core';
import {LinearApproximationService} from './LinearApproximation.service';
import {MatrixMathService} from './MatrixMath.service';
import {QuadraticApproximationService} from './QuadraticApproximation.service';
import {ExponentialApproximationService} from './ExponentialApproximation.service';
import {LogarithmicApproximationService} from './LogarithmicApproximation.service';
import {PowerLawApproximationService} from './Power-lawApproximation.service';

import {
  IBarChartOptions,
  IChartistAnimationOptions,
  IChartistData
} from 'chartist';
import { ChartEvent, ChartType } from 'ng-chartist';
import {isDigit} from 'codelyzer/angular/styles/chars';

interface AnyFunction {

  Name: string ;
  func: string ;

  execute(data: number[][], service?: AnyFunction): number[][];

}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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
          y2: {
            dur: '0.5s',
            from: data.y1,
            to: data.y2,
            easing: 'easeOutQuad'
          } as IChartistAnimationOptions
        });
      }
    }
  };

  title = 'lab4-VichMat';

  DEFAULT_NUMBERS: number[][] = [
    [1.2, 2.9, 4.1, 5.5, 6.7, 7.8, 9.2, 10.3],
    [7.4, 9.5, 11.1, 12.9, 14.6, 17.3, 18.2, 20.7]
  ];

  DEFAULT_NUMBERS2: number[][] = [
    [1.1, 2.3, 3.7, 4.5, 5.4, 6.8, 7.5],
    [3.5, 4.1, 5.2, 6.9, 8.3, 14.8, 21.2]
  ];

  DEFAULT_NUMBERS3: number[][] = [
    [-3, 4, -5, 6],
    [3, -4, 5, -6]
  ];

  showChard = false;
  funcName;
  funcMain;
  Numbers = this.DEFAULT_NUMBERS2;

  ApproximationReliability: number[] = [];
  Functions: string[] = [];
  Outs: number[][][] = [];

  Xs: number[] = this.DEFAULT_NUMBERS3[0];
  Ys: number[] = this.DEFAULT_NUMBERS3[1];

  // Xs: number[];
  // Ys: number[];

  out: number[][] = [];
  R = -1;
  cArray: string[] = [];
  additionalOption = '';

  constructor(private linearApproximationService: LinearApproximationService,
              private quadraticApproximationService: QuadraticApproximationService,
              private exponentialApproximationService: ExponentialApproximationService,
              private logarithmicApproximationService: LogarithmicApproximationService,
              private powerLawApproximationService: PowerLawApproximationService
              ) {
  }

  execute(): void{

    this.clear();

    this.addToRows(this.linearApproximationService);

    this.addToRows(this.quadraticApproximationService);

    this.addToRows(this.exponentialApproximationService);

    this.addToRows(this.logarithmicApproximationService);

    this.addToRows(this.powerLawApproximationService);

    this.makeChart(this.out);

    if (this.out[6] !== undefined){
      // @ts-ignore
      this.additionalOption = this.out[6][0];
    }




  }

  makeChart(mainData: number[][]): void{

    this.showChard = true;

    const labels: number[] = [];
    const series1: number[] = [];
    const series2: number[] = [];
    const interval = (mainData[0][mainData[0].length - 1] - mainData[0][0]) / mainData[0].length;
    labels.push(Math.round(mainData[0][0] - interval));
    series1.push(null);
    series2.push(null);

    for (let i = 0; i < mainData[0].length; i++){
      labels.push(mainData[0][i]);
      series1.push(mainData[1][i]);
      series2.push(mainData[2][i]);
    }

    labels.push(Math.round(mainData[0][mainData[0].length - 1] + interval));
    series1.push(null);
    series2.push(null);

    this.data.labels = labels;
    this.data.series = [series1, series2];



  }

  // addSeriesToChart(mainData: number[]): void{
  //   let temp = this.data.series;
  //   temp.push(mainData);
  //   this.data.series.push(mainData);
  // }

    makeApproximationReliability(mainData: number[][]): number{

    console.log(mainData);

    let Up = 0;
    let Down1 = 0;
    let Down2 = 0;

    for (let i = 0; i < mainData[0].length; i++){
        Up += Math.pow(mainData[1][i] - mainData[2][i], 2);
        Down1 += Math.pow(mainData[2][i], 2);
        Down2 += mainData[2][i];
      }

    const datOut = Up / (Down1 - (Down2 / mainData[0].length));

    console.log(datOut);

    this.ApproximationReliability.push(datOut);

    return  datOut;
    }

    getC(i: number): string{


    // @ts-ignore
      if (this.Outs[i][5][2] !== 'A'){
      console.log('&');
      // @ts-ignore
      return this.Outs[i][5][2].toString();
    } else {
      return '-';
    }

    }

    addToRows(func: AnyFunction): void{
      const temp = func.execute([this.Xs, this.Ys], this.linearApproximationService);
      const Rnow = this.makeApproximationReliability(temp);

      this.Functions.push(func.func);
      this.Outs.push(temp);

      this.cArray.push(this.getC(this.cArray.length));

      // if (func.func === 'fi = a*x + b'){
      //   Rnow = 1;
      // }

      if (this.R < Rnow){
        this.R = Rnow;
        this.out = temp;
        this.funcName = func.Name;
        this.funcMain = func.func;
      }

    }

    clear(): void{

      this.out = [];
      this.Functions = [];
      this.Outs = [];
      this.cArray = [];
      this.R = -1;
      this.out = undefined;
      this.funcName = undefined;
      this.funcMain = undefined;
      this.ApproximationReliability = [];
      this.showChard = false;
      this.data.labels = [];
      this.data.series = [];
      this.additionalOption = '';



    }

    XsChange(val: string): void {

      const temp1 = val.split(',');
      const temp2: number[] = [];

      for (const str of temp1){
        temp2.push(Number.parseFloat(str));
      }

      this.Xs = temp2;
      console.log(this.Xs);
    }

  YsChange(val: string): void {

    const temp1 = val.split(',');
    const temp2: number[] = [];

    for (const str of temp1){
      temp2.push(Number.parseFloat(str));
    }

    this.Ys = temp2;
    console.log(this.Ys);
  }

}
