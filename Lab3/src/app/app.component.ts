import { Component } from '@angular/core';
import {RectangleMethodService} from './RectangleMethod.service';
import {SimpsonMethodService} from './SimpsonMethod.service';
import {TrapezoidMethodService} from './TrapezoidMethod.service';
import {Equation} from './Equation';
import {interval} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lab3-VichMat';

  equalNumber = '0';
  methodNumber = '0';
  rectangleMethodNumber = '0';
  a = 1;
  b = 2;
  E = 0.1;
  Error = false;

  finalResult = null;
  finalN = null;

  constructor(private RectangleService: RectangleMethodService,
              private SimpsonService: SimpsonMethodService,
              private TrapezoidService: TrapezoidMethodService,
              private Equal: Equation
              ) {

  }

  execute(): void{
    this.clear();
    this.check();
    let n = 10;
    let nowE = this.E + 1;
    let prevResult: number = null;
    let result;

    // console.log('equal = ' + this.equalNumber);
    // console.log('method = ' + this.methodNumber);
    // console.log('rectange = ' + this.rectangleMethodNumber);

    while (nowE >= this.E){
      if (prevResult === null){

        prevResult = this.getResult(n);
        console.log(prevResult);

      }else{

        result = this.getResult(n);
        console.log(result);

        nowE = Math.abs(prevResult - result);
        console.log(nowE);
        prevResult = result;

      }

      n = n * 2;
      // nowE = this.E - 1;

    }

    this.finalN = n;
    this.finalResult = result;
  }

  equalChange(): void{
    this.Equal.setEqual(this.equalNumber);
  }

  getResult(n: number): number{
    switch (this.methodNumber){
      case '0': { // rectangle
        switch (this.rectangleMethodNumber){
          case '0': {
            return this.RectangleService.getLeftResult(this.a, this.b, this.Equal, n); // left
            }
          case '1': {
            return this.RectangleService.getRightResult(this.a, this.b, this.Equal, n); // right
            }
          case '2': {
            return this.RectangleService.getMiddleResult(this.a, this.b, this.Equal, n); // middle
            }
          default: {
            return this.RectangleService.getLeftResult(this.a, this.b, this.Equal, n); // right
            }
          }
        }

      case '1': {
        return this.TrapezoidService.getResult(this.a, this.b, this.Equal, n);
      }
      case '2': {
        return this.SimpsonService.getResult(this.a, this.b, this.Equal, n);
      }
      default: {
        return this.TrapezoidService.getResult(this.a, this.b, this.Equal, n);
      }
    }
  }

  clear(): void{
    this.finalResult = null;
    this.finalN = null;
    this.Error = false;
  }

  check(): void{
    let flag = true;

    for (let i = this.a; i <= this.b;){
      if (i < 0){
        flag = false;
        break;
      }
      i = i + (this.b - this.a) / 10;
    }
    this.Error = !flag;

  }

}
