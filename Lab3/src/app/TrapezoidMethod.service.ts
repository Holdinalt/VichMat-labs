import {Injectable} from '@angular/core';
import {Equation} from './Equation';

@Injectable()
export class TrapezoidMethodService{
  getResult(a: number, b: number, equal: Equation, n: number): number{
    console.log('Trapezoid');
    let out = 0;
    const interval = this.getInterval(a, b, n);

    for (let i = 1; i < n + 1; ++i){
      // Hi * (Yi-1 + Yi)
      out = out + interval * ((equal.getResult(a + interval * (i - 1)) + equal.getResult(a + interval * (i - 1))));
    }

    // console.log('n = ' + n);
    // console.log('out = ' + out / 2);
    return out / 2;
  }

  getInterval(a: number, b: number, n: number): number{
    return Math.abs(b - a) / n;
  }
}
