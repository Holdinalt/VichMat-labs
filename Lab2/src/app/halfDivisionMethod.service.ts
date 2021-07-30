import {Injectable} from '@angular/core';
import {Equation} from './Equation';
import {ChardData} from './ChardData';

@Injectable()
export class HalfDivisionMethodService {

  outTable: number[][];

  nowN = 0; // for table

  private makeX(a: number, b: number): number{ // make C  C=(a+b)/2
    return (a + b) / 2;
  }

  private makeRow(a: number, b: number, x: number, equal: Equation): void{

    const tempTable: number[] = [];

    tempTable.push(this.nowN);
    ++this.nowN;
    tempTable.push(a);
    tempTable.push(b);
    tempTable.push(x);
    tempTable.push(equal.getResult(a));
    tempTable.push(equal.getResult(b));
    tempTable.push(equal.getResult(x));
    tempTable.push(Math.abs(a - b));


    this.outTable.push(tempTable);
  }

  execute(a: number, b: number, E: number, equal: Equation): number[][]{
    this.outTable = [];
    this.nowN = 0;
    // @ts-ignore
    this.outTable.push(['№', 'a', 'b', 'x', 'f(a)', 'f(b)', 'f(x)', '|a-b|']);

    let x: number;

    while (true) {

      x = this.makeX(a, b);

      this.makeRow(a, b, x, equal);

      if (Math.abs(a - b) <= E || Math.abs(equal.getResult(x)) < E) {
        break;
      }

      if (equal.getResult(a) * equal.getResult(x) > 0) {
        a = x;
      } else {
        b = x;
      }

    }

    return this.outTable;
  }


}
