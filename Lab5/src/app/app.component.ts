import {Component} from '@angular/core';
import {LagrangePolynomialService} from "./LagrangePolynomial.service";
import {NewtonPolynomialSeparatedDiffService1} from './NewtonPolynomialSeparatedDiff.service';

import {
  IBarChartOptions,
  IChartistAnimationOptions,
  IChartistData
} from 'chartist';
import {ChartEvent, ChartType} from 'ng-chartist';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lab5-VichMat';

  type: ChartType = 'Line';
  data: IChartistData = {
    labels: [],
    series: []
  };

  options: IBarChartOptions = {
    chartPadding: {},
    axisY: {
      showGrid: true
    },
    axisX: {
      showGrid: true
    },
    height: 300,
  };

  events: ChartEvent = {
    draw: (data) => {
      if (data.type === 'line') {
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

  DEFAULT_NUMBERS1 = [
    [0.1, 0.2, 0.3, 0.4, 0.5],
    [1.25, 2.38, 3.79, 5.44, 7.14]
  ];
  DEFAULT_X1 = 0.35;

  DEFAULT_NUMBERS2 = [
    [0.15, 0.2, 0.33, 0.47, 0.62],
    [1.25, 2.38, 3.79, 5.44, 7.14]
  ];
  DEFAULT_X2 = 0.22;

  input: number[][] = this.DEFAULT_NUMBERS1
  inputX: number = this.DEFAULT_X1;
  methodInput: string = '0';

  typeInput: boolean = true;
  funcInput: string = '0';

  showChard: boolean = false;
  answer: number = 0;

  constructor(private newtonPolynomialSeparatedDiffService1: NewtonPolynomialSeparatedDiffService1,
              private lagrangePolynomialService: LagrangePolynomialService) {
  }

  //l ol

  execute() {
    this.clear();
    console.log(this.input);
    console.log(this.inputX);
    console.log(this.methodInput);

    let out = [[0]];

    if (!this.typeInput) {

      console.log(this.funcInput);

      this.input = this.makeDataFromFunction(this.funcInput, this.inputX)

    }

    switch (this.methodInput) {
      case '0': {

        out = this.lagrangePolynomialService.execute(this.input, this.inputX)

        break
      }
      case '1': {

        out = this.newtonPolynomialSeparatedDiffService1.execute(this.input, this.inputX);

        break
      }

    }

    console.log(out);

    this.makeChart(this.input[0], this.input[1]);

    this.answer = out[0][0];


  }

  changeVal(x: number, place: any): void {
    place = x;
  }

  makeChart(dataX: number[], dataY: number[]): void {
    this.data.labels = dataX;
    this.data.series = [dataY];
    this.showChard = true;
  }

  clear(): void {
    this.data.labels = [];
    this.data.series = [];
    this.showChard = false;
  }

  makeDataFromFunction(func: string, x: number): number[][] {

    // @ts-ignore
    x = Number.parseFloat(x);

    let out: number[][] = [];
    let end;
    let start;

    for (end = -100; end < x; end = end + 10) {
    }

    start = end - 10;

    let Xs: number[] = [];
    let Ys: number[] = [];

    switch (func) {
      case '0': { // sin

        for (let i = start; i <= end; i++) {
          Xs.push(i);
          Ys.push(Math.sin(i));
        }

        break;
      }

      case '1': { // tan

        for (let i = start; i <= end; i++) {
          Xs.push(i);
          Ys.push(Math.tan(i));
        }

        break;
      }

      case '2': { // x^2 + 2

        for (let i = start; i <= end; i++) {
          Xs.push(i);
          Ys.push(Math.pow(i, 2) + 2);
        }

        break;
      }

    }

    out.push(Xs);
    out.push(Ys);

    return out;

  }
}
