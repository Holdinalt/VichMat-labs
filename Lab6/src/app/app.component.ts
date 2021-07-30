import { Component } from '@angular/core';
import {EulerMethodService} from "./EulerMethod.service";
import {Equal} from "./Equal";
import {MilneMethodService} from "./MilneMethod.service";

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
  title = 'lab6-VichMat';

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

  DEFAULT_NUMBERS = [1, 1.5, -1, 0.1] // a, b, y0, h

  inputA = this.DEFAULT_NUMBERS[0];
  inputB = this.DEFAULT_NUMBERS[1];
  inputY0 = this.DEFAULT_NUMBERS[2];
  inputH  = this.DEFAULT_NUMBERS[3];
  inputFunc = 0;
  inputMethod = '0';
  showChard = false;

  equal: Equal = new Equal();
  out: number[][] = [];

  constructor(
    private eulerMethod: EulerMethodService,
    private milneMethod: MilneMethodService
  ) {
  }

  execute(): void{

    this.clear();

    switch (this.inputMethod){

      case '0': {
        //y0: any, h: any, a: any, b: any, equal: Equal
        this.out = this.eulerMethod.execute(this.inputY0, this.inputH, this.inputA, this.inputB, this.equal);
        break
      }

      case '1': {
        this.out = this.milneMethod.execute(this.inputY0, this.inputH, this.inputA, this.inputB, this.equal);
        break
      }

    }

    this.makeChart(this.out[2], [this.out[3], this.makeAnswer()]);

    console.log(this.out);
  }

  changeFunc(){
    this.equal.setFunc(this.inputFunc);
  }

  makeChart(dataX: number[], dataSeries: number[][]): void {
    this.data.labels = dataX;
    this.data.series = dataSeries;
    this.showChard = true;
  }

  clear(): void {
    this.out = [];
    this.data.labels = [];
    this.data.series = [];
    this.showChard = false;
  }

  makeAnswer(): number[]{

    let answer: number[] = [];

    for (let i = 0; i < this.out[2].length; i++){
      answer.push(this.equal.getAnswerResult(this.out[2][i]))
    }

    return answer;

  }
}
