import {Injectable} from '@angular/core';
import {Equation} from './Equation';

@Injectable()
export class SimpsonMethodService{
  getResult(a: number, b: number, equal: Equation, n: number): number{
    console.log('Simpson');
    let out = 0;
    const interval = this.getInterval(a, b, n);

    let yNech = 0;
    let yCh = 0;

    for (let i = 1; i < n; ++i){
      if (i % 2 === 0){
        yCh = yCh + equal.getResult(a + interval * i);
      } else{
        yNech = yNech + equal.getResult(a + interval * i);
      }
    }

    out = 4 * yNech + 2 * yCh;

    return (out + equal.getResult(a) + equal.getResult(b)) * interval / 3;
  }

  getInterval(a: number, b: number, n: number): number{
    return Math.abs(b - a) / n;
  }
}
