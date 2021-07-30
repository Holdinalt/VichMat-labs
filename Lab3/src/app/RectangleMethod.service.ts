import {Injectable} from '@angular/core';
import {Equation} from './Equation';

@Injectable()
export class RectangleMethodService{

  getLeftResult(a: number, b: number, equal: Equation, n: number): number{
    console.log('RectangleLeft');
    let out = 0;
    const interval = this.getInterval(a, b, n);

    for (let i = 1; i < n + 1; ++i){
      out = out + interval * equal.getResult(a + interval * (i - 1)); // Hi * Yi-1
    }

    return out;
  }

  getRightResult(a: number, b: number, equal: Equation, n: number): number{
    console.log('RectangleRight');
    let out = 0;
    const interval = this.getInterval(a, b, n);

    for (let i = 0; i < n + 1; ++i){
      out = out + interval * equal.getResult(a + interval * i); // Hi * Yi-1
    }

    return out;
  }

  getMiddleResult(a: number, b: number, equal: Equation, n: number): number{
    console.log('RectangleMiddle');
    let out = 0;
    const interval = this.getInterval(a, b, n);

    for (let i = 0; i < n + 1; ++i){
      out = out + interval * equal.getResult((a + interval * i + a + interval * (i + 1)) / 2); // Hi * Yi-1
    }

    return out;
  }

  getInterval(a: number, b: number, n: number): number{
    return Math.abs(b - a) / n;
  }

}
